'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { KANA_DATA } from '@/data/hiraganaData';

export default function HomePage() {
  const { progress, isLoaded, getCollectionCount } = useProgress();

  const totalCollected = getCollectionCount();
  const totalPokemon = KANA_DATA.reduce((acc, entry) => acc + (entry.pokemons?.length || 0), 0);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #534AB7 0%, #7F77DD 50%, #9B8FEE 100%)',
      }}
    >
      {/* Decorative floating circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10 bg-white"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Logo area */}
      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* App icon */}
        <motion.div
          className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/30"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-6xl">✨</span>
        </motion.div>

        {/* App title */}
        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-wider drop-shadow-lg">
            ポケもじ
          </h1>
          <p className="text-white/80 text-lg mt-2 font-medium">
            ひらがなを たのしく おぼえよう！
          </p>
        </div>

        {/* Progress indicator */}
        {isLoaded && totalCollected > 0 && (
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 border border-white/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <span className="text-white text-sm font-semibold">
              🏆 {totalCollected} / {totalPokemon} あつめた
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-col gap-4 mt-12 w-full max-w-xs px-6 z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/learn" className="block">
          <motion.div
            className="w-full py-5 rounded-2xl bg-white text-brand-purple font-black text-2xl text-center shadow-xl
              hover:shadow-2xl transition-shadow"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            aria-label="まなぶ画面へ"
          >
            <span className="flex items-center justify-center gap-3">
              📚 まなぶ
            </span>
          </motion.div>
        </Link>

        <Link href="/zukan" className="block">
          <motion.div
            className="w-full py-5 rounded-2xl bg-white/20 backdrop-blur-sm text-white font-black text-2xl text-center 
              shadow-xl border border-white/30 hover:bg-white/30 transition-colors"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            aria-label="ずかん画面へ"
          >
            <span className="flex items-center justify-center gap-3">
              📖 ずかん
            </span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Settings link */}
      <motion.div
        className="mt-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/settings"
          className="text-white/60 text-sm hover:text-white/80 transition-colors"
          aria-label="設定画面へ"
        >
          ⚙️ せってい
        </Link>
      </motion.div>
    </main>
  );
}
