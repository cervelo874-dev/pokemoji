'use client';

import { useCallback } from 'react';

const CACHE_NAME = 'pokemoji-voice-cache';

export function useSpeech(soundEnabled: boolean = true, volume: number = 0.8) {
  const speak = useCallback(async (text: string) => {
    if (!soundEnabled) return;
    if (typeof window === 'undefined') return;

    try {
      // In static deployment like GitHub Pages, Serverless API Routes do not work.
      // We will try using /api/tts. If it fails/throws, we gracefully fallback to Web Speech API.
      const ttsApiUrl = `/api/tts?text=${encodeURIComponent(text)}`;
      let audioUrl = ttsApiUrl;
      let usingCache = false;

      // Check Cache API compatibility
      if ('caches' in window) {
        try {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(ttsApiUrl);

          if (cachedResponse) {
            const blob = await cachedResponse.blob();
            audioUrl = URL.createObjectURL(blob);
            usingCache = true;
          } else {
            // Attempt to fetch from our API
            const response = await fetch(ttsApiUrl);
            if (response.ok) {
              // Save clone to browser cache
              await cache.put(ttsApiUrl, response.clone());
              const blob = await response.blob();
              audioUrl = URL.createObjectURL(blob);
              usingCache = true;
            } else {
              throw new Error('TTS API returned non-200 response');
            }
          }
        } catch (e) {
          console.warn('Cache API or API Route failed, falling back to Web Speech API:', e);
          fallbackSpeak(text, volume);
          return;
        }
      } else {
        // Cache API not supported, fallback to Web Speech API
        fallbackSpeak(text, volume);
        return;
      }

      // Play synthesized audio
      const audio = new Audio(audioUrl);
      audio.volume = volume;
      
      // Stop other playing synthesized audios by tracking if necessary,
      // or rely on simple audio object.
      await audio.play().catch(err => {
        console.warn('HTML5 Audio play failed, falling back to Web Speech API:', err);
        fallbackSpeak(text, volume);
      });

      // Cleanup object URL once finished to prevent memory leaks
      audio.onended = () => {
        if (usingCache && audioUrl.startsWith('blob:')) {
          URL.revokeObjectURL(audioUrl);
        }
      };

    } catch (error) {
      console.error('Speech synthesis error, falling back to Web Speech API:', error);
      fallbackSpeak(text, volume);
    }
  }, [soundEnabled, volume]);

  // Standard Web Speech API fallback (robots/local synthesis engine)
  const fallbackSpeak = (text: string, vol: number) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = vol;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Fallback SpeechSynthesis failed:', e);
    }
  };

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
