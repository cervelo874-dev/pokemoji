'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProgressData, RowId, SettingsData } from '@/types';
import { ROW_META, KANA_DATA } from '@/data/hiraganaData';

const PROGRESS_KEY = 'pojimoji_progress';
const SETTINGS_KEY = 'pojimoji_settings';

function createInitialProgress(): ProgressData {
  const rows: ProgressData['rows'] = {};
  
  ROW_META.forEach((row, index) => {
    const chars: { [kana: string]: { seen: number; correct: number; mastered: boolean } } = {};
    row.kanaList.forEach(kana => {
      chars[kana] = { seen: 0, correct: 0, mastered: false };
    });
    rows[row.id] = {
      unlocked: index === 0, // Only あ行 is unlocked initially
      completed: false,
      chars,
    };
  });
  
  return {
    version: 1,
    lastPlayed: new Date().toISOString(),
    rows,
    collection: [],
  };
}

const DEFAULT_SETTINGS: SettingsData = {
  soundEnabled: true,
  volume: 0.8,
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        const initial = createInitialProgress();
        setProgress(initial);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(initial));
      }
      
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch {
      const initial = createInitialProgress();
      setProgress(initial);
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: ProgressData) => {
    newProgress.lastPlayed = new Date().toISOString();
    setProgress(newProgress);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings: SettingsData) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, []);

  // Record an answer
  const recordAnswer = useCallback((kana: string, rowId: string, isCorrect: boolean, pokemonName?: string) => {
    if (!progress) return;
    
    const newProgress = JSON.parse(JSON.stringify(progress)) as ProgressData;
    const row = newProgress.rows[rowId];
    if (!row || !row.chars[kana]) return;
    
    row.chars[kana].seen += 1;
    if (isCorrect) {
      row.chars[kana].correct += 1;
    }
    if (row.chars[kana].correct >= 3) {
      row.chars[kana].mastered = true;
    }
    
    // Check if all chars in row are mastered
    const allMastered = Object.values(row.chars).every(c => c.mastered);
    if (allMastered) {
      row.completed = true;
    }
    
    // Add pokemon to collection if correct and not already there
    if (isCorrect && pokemonName) {
      if (!newProgress.collection.includes(pokemonName)) {
        newProgress.collection.push(pokemonName);
      }
    }
    
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  // Unlock next row
  const unlockNextRow = useCallback((currentRowId: string) => {
    if (!progress) return;
    
    const rowIndex = ROW_META.findIndex(r => r.id === currentRowId);
    if (rowIndex < 0 || rowIndex >= ROW_META.length - 1) return;
    
    const nextRowId = ROW_META[rowIndex + 1].id;
    const newProgress = JSON.parse(JSON.stringify(progress)) as ProgressData;
    if (newProgress.rows[nextRowId]) {
      newProgress.rows[nextRowId].unlocked = true;
    }
    
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  // Get row progress percentage
  const getRowProgress = useCallback((rowId: string): number => {
    if (!progress) return 0;
    const row = progress.rows[rowId];
    if (!row) return 0;
    
    const chars = Object.values(row.chars);
    const mastered = chars.filter(c => c.mastered).length;
    return chars.length > 0 ? Math.round((mastered / chars.length) * 100) : 0;
  }, [progress]);

  // Get collection count
  const getCollectionCount = useCallback((): number => {
    return progress?.collection.length ?? 0;
  }, [progress]);

  // Check if a pokemon is collected
  const isPokemonCollected = useCallback((pokemonName: string): boolean => {
    return progress?.collection.includes(pokemonName) ?? false;
  }, [progress]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    const initial = createInitialProgress();
    saveProgress(initial);
  }, [saveProgress]);

  return {
    progress,
    settings,
    isLoaded,
    recordAnswer,
    unlockNextRow,
    getRowProgress,
    getCollectionCount,
    isPokemonCollected,
    saveSettings,
    resetProgress,
  };
}
