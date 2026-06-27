'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ROW_META } from '@/data/hiraganaData';
import { useProgress } from '@/hooks/useProgress';
import RowProgressBar from '@/components/RowProgressBar';
import BottomNav from '@/components/BottomNav';

const ROW_EMOJIS: Record<string, string> = {
  a: '🌟', ka: '🔥', sa: '🌊', ta: '🌿', na: '🌸',
  ha: '✨', ma: '🌙', ya: '⚡', ra: '💎', wa: '🌈',
};

export default function LearnPage() {
  const { progress, isLoaded, getRowProgress } = useProgress();

  if (!isLoaded || !progress) {
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

  // Check if all hiragana rows are fully unlocked and completed to unlock random mode
  const allRowsCompleted = ROW_META.every(row => progress.rows[row.id]?.completed);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-brand-purplePale to-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-brand-purplePale/80 backdrop-blur-md px-6 pt-6 pb-4">
        <motion.h1
          className="text-2xl font-black text-brand-purple text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          どの行を れんしゅうする？
        </motion.h1>
      </div>

      {/* Row cards */}
      <div className="px-4 py-4 flex flex-col gap-3 max-w-lg mx-auto">
        {ROW_META.map((row, index) => {
          const rowProgress = progress.rows[row.id];
          const isUnlocked = rowProgress?.unlocked ?? false;
          const isCompleted = rowProgress?.completed ?? false;
          const progressPercent = getRowProgress(row.id);

          return (
            <motion.div
              key={row.id}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {isUnlocked ? (
                <Link href={`/learn/${row.id}`}>
                  <div className={`bg-white rounded-2xl p-5 shadow-md border-2 transition-all
                    ${isCompleted ? 'border-brand-greenLight' : 'border-transparent hover:border-brand-purpleLight'}
                    hover:shadow-lg active:scale-[0.98]`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                        ${isCompleted ? 'bg-brand-greenPale' : 'bg-brand-purplePale'}`}
                      >
                        {isCompleted ? '✅' : ROW_EMOJIS[row.id] || '⭐'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h2 className="text-xl font-bold text-gray-800">{row.label}</h2>
                          <span className="text-sm text-gray-500 font-medium">
                            {progressPercent}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {row.kanaList.map(k => (
                            <span key={k} className="text-sm text-gray-500">{k}</span>
                          ))}
                        </div>
                        <RowProgressBar progress={progressPercent} />
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-5 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center text-2xl">
                      🔒
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-400">{row.label}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        {row.kanaList.map(k => (
                          <span key={k} className="text-sm text-gray-400">{k}</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">まえの行を クリアしよう！</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* ごちゃまぜモードカード */}
        <motion.div
          key="random-mode"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: ROW_META.length * 0.05 }}
        >
          {allRowsCompleted ? (
            <Link href="/learn/random">
              <div className="bg-gradient-to-r from-brand-purple to-brand-purpleLight rounded-2xl p-5 shadow-lg border-2 border-transparent text-white hover:shadow-xl active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-3xl">
                    🎲
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-extrabold">ごちゃまぜテスト</h2>
                    <p className="text-xs text-white/80 mt-1">
                      ぜんぶの ひらがなが ランダムに でてくるよ！（10もん）
                    </p>
                  </div>
                  <div className="text-2xl font-bold">👉</div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-gray-100 rounded-2xl p-5 border-2 border-dashed border-gray-300 opacity-60 cursor-not-allowed">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center text-2xl">
                  🔒
                </div>
                <div className="flex-1 text-gray-500">
                  <h2 className="text-xl font-bold text-gray-400">ごちゃまぜテスト</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    ぜんぶの行を クリアすると あそべるよ！
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}
