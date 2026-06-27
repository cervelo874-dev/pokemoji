'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PokemonInfo } from '@/types';
import { TYPE_COLORS } from '@/data/hiraganaData';
import PokemonImage from './PokemonImage';

interface ClearModalProps {
  isOpen: boolean;
  rowLabel: string;
  earnedPokemon: PokemonInfo[];
  onNext: () => void;
  hasNextRow: boolean;
}

export default function ClearModal({ isOpen, rowLabel, earnedPokemon, onNext, hasNextRow }: ClearModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 mx-6 max-w-sm w-full shadow-2xl text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Celebration emoji */}
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              🎉
            </motion.div>

            <h2 className="text-2xl font-bold text-brand-purple mb-2">
              やったー！
            </h2>
            <p className="text-xl font-semibold text-gray-700 mb-6">
              {rowLabel} クリア！
            </p>

            {/* Earned Pokemon */}
            {earnedPokemon.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">ゲットしたポケモン</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {earnedPokemon.map((entry, index) => (
                    <motion.div
                      key={`${entry.name}-${index}`}
                      className="flex flex-col items-center gap-1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden relative"
                        style={{ backgroundColor: entry.type ? TYPE_COLORS[entry.type] : '#A8A878' }}
                      >
                        <PokemonImage id={entry.id} name={entry.name} className="w-10 h-10" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold">{entry.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              className="w-full py-4 rounded-2xl bg-brand-purple text-white font-bold text-lg shadow-lg
                hover:bg-brand-purpleLight transition-colors"
              onClick={onNext}
              whileTap={{ scale: 0.95 }}
              aria-label={hasNextRow ? '次の行へ進む' : 'ホームに戻る'}
            >
              {hasNextRow ? 'つぎへ すすむ！' : 'ホームへ もどる'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
