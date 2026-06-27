'use client';

import { motion } from 'framer-motion';
import { ROW_META, getRowEntries, KANA_DATA } from '@/data/hiraganaData';
import { useProgress } from '@/hooks/useProgress';
import { useSpeech } from '@/hooks/useSpeech';
import ZukanSlot from '@/components/ZukanSlot';
import RowProgressBar from '@/components/RowProgressBar';
import BottomNav from '@/components/BottomNav';

export default function ZukanPage() {
  const { progress, isLoaded, isPokemonCollected, settings, getCollectionCount } = useProgress();
  const { speakPokemon } = useSpeech(settings.soundEnabled, settings.volume);

  const totalCollected = getCollectionCount();
  // Dynamically count all available pokemons
  const totalPokemon = KANA_DATA.reduce((acc, entry) => acc + (entry.pokemons?.length || 0), 0);
  const overallProgress = totalPokemon > 0 ? Math.round((totalCollected / totalPokemon) * 100) : 0;

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

  return (
    <main className="min-h-dvh bg-gradient-to-b from-brand-purplePale to-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-brand-purplePale/80 backdrop-blur-md px-6 pt-6 pb-4">
        <motion.h1
          className="text-2xl font-black text-brand-purple text-center mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          📖 ずかん
        </motion.h1>
        <div className="text-center text-sm text-brand-purple/70 font-bold mb-3">
          {totalCollected} / {totalPokemon} あつめた
        </div>
        <div className="max-w-xs mx-auto">
          <RowProgressBar progress={overallProgress} height={10} />
        </div>
      </div>

      {/* Row sections */}
      <div className="px-4 py-4 flex flex-col gap-6 max-w-lg mx-auto">
        {ROW_META.map((row, index) => {
          const entries = getRowEntries(row.id);
          return (
            <motion.section
              key={row.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <h2 className="text-lg font-black text-gray-700 mb-3 px-1">
                {row.label}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-items-center">
                {entries.map((entry) => {
                  return (
                    <ZukanSlot
                      key={entry.kana}
                      entry={entry}
                      isCollected={isPokemonCollected}
                      onTapPokemon={speakPokemon}
                    />
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>

      <BottomNav />
    </main>
  );
}
