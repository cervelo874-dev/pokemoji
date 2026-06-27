'use client';

import { useCallback } from 'react';

export function useSpeech(soundEnabled: boolean = true, volume: number = 0.8) {
  const speak = useCallback((text: string) => {
    if (!soundEnabled) return;
    if (typeof window === 'undefined') return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = volume;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [soundEnabled, volume]);

  const speakKana = useCallback((kana: string) => {
    speak(kana);
  }, [speak]);

  const speakPokemon = useCallback((pokemonName: string) => {
    speak(`${pokemonName}！`);
  }, [speak]);

  const speakCorrect = useCallback(() => {
    speak('せいかい！');
  }, [speak]);

  const speakWrong = useCallback((correctAnswer: string) => {
    speak(`ざんねん。こたえは ${correctAnswer}`);
  }, [speak]);

  const speakClear = useCallback((rowLabel: string) => {
    speak(`やったー！ ${rowLabel} クリア！`);
  }, [speak]);

  return {
    speak,
    speakKana,
    speakPokemon,
    speakCorrect,
    speakWrong,
    speakClear,
  };
}
