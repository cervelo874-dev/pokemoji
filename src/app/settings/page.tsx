'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/hooks/useProgress';
import { useSpeech } from '@/hooks/useSpeech';
import BottomNav from '@/components/BottomNav';

export default function SettingsPage() {
  const { settings, saveSettings, resetProgress, isLoaded } = useProgress();
  const { speak } = useSpeech(settings.soundEnabled, settings.volume);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  if (!isLoaded) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-brand-purplePale">
        <motion.div
          className="text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          ⭐
        </motion.div>
      </main>
    );
  }

  const handleToggleSound = () => {
    const newSettings = { ...settings, soundEnabled: !settings.soundEnabled };
    saveSettings(newSettings);
    if (newSettings.soundEnabled) {
      setTimeout(() => speak('おとが つきました'), 100);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    saveSettings({ ...settings, volume });
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <main className="min-h-dvh bg-gradient-to-b from-brand-purplePale to-white pb-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <motion.h1
          className="text-2xl font-black text-brand-purple text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          ⚙️ せってい
        </motion.h1>
        <p className="text-center text-sm text-gray-500 mt-1">ほごしゃさま むけ</p>
      </div>

      <div className="px-6 py-4 flex flex-col gap-4 max-w-lg mx-auto">
        {/* Sound toggle */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">🔊 おと</h2>
              <p className="text-sm text-gray-500">おんせいのオン/オフ</p>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-14 h-8 rounded-full transition-colors relative
                ${settings.soundEnabled ? 'bg-brand-purple' : 'bg-gray-300'}`}
              aria-label="音声のオンオフ"
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1"
                animate={{ left: settings.soundEnabled ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Volume slider */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">🎵 おんりょう</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">🔇</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 rounded-full appearance-none bg-gray-200
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-purple [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer"
              aria-label="音量調整"
            />
            <span className="text-sm text-gray-500">🔊</span>
            <span className="text-sm font-semibold text-brand-purple w-10 text-right">
              {Math.round(settings.volume * 100)}%
            </span>
          </div>
        </motion.div>

        {/* Reset button */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-2">🔄 さいしょから はじめる</h2>
          <p className="text-sm text-gray-500 mb-4">
            すべてのしんちょく・ずかんデータがリセットされます
          </p>

          {resetDone ? (
            <motion.div
              className="w-full py-3 rounded-xl bg-brand-greenPale text-brand-green font-bold text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              ✅ リセットしました
            </motion.div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 rounded-xl bg-red-50 text-red-500 font-bold border-2 border-red-200
                hover:bg-red-100 transition-colors"
              aria-label="進捗をリセット"
            >
              リセットする
            </button>
          )}
        </motion.div>
      </div>

      {/* Reset confirmation dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 mx-6 max-w-sm w-full shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ほんとうに リセットしますか？</h3>
              <p className="text-sm text-gray-500 mb-6">
                すべてのデータがけされます。このそうさはもとにもどせません。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold
                    hover:bg-gray-200 transition-colors"
                  aria-label="キャンセル"
                >
                  やめる
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold
                    hover:bg-red-600 transition-colors"
                  aria-label="リセット確認"
                >
                  リセット
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </main>
  );
}
