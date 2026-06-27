'use client';

import { motion } from 'framer-motion';
import { QuizChoice, ChoiceState } from '@/types';
import { TYPE_COLORS } from '@/data/hiraganaData';
import PokemonImage from './PokemonImage';

interface PokemonChoiceProps {
  entry: QuizChoice;
  state: ChoiceState;
  onTap: () => void;
}

const correctVariants = {
  initial: { scale: 1, borderColor: 'rgba(0,0,0,0)' },
  correct: {
    scale: [1, 1.15, 1.05, 1],
    borderColor: '#16A34A',
    transition: { duration: 0.45 },
  },
};

const wrongVariants = {
  initial: { x: 0 },
  wrong: {
    x: [0, -10, 10, -10, 10, 0],
    borderColor: '#DC2626',
    transition: { duration: 0.4 },
  },
};

export default function PokemonChoice({ entry, state, onTap }: PokemonChoiceProps) {
  const bgColor = state === 'correct'
    ? 'bg-green-50'
    : state === 'wrong'
    ? 'bg-red-50'
    : 'bg-white';

  const borderColor = state === 'correct'
    ? 'border-green-500'
    : state === 'wrong'
    ? 'border-red-500'
    : 'border-gray-200';

  const typeColor = entry.type ? TYPE_COLORS[entry.type] : '#A8A878';
  const isDisabled = state === 'disabled' || state === 'correct' || state === 'wrong';

  return (
    <motion.button
      className={`min-h-[170px] w-full rounded-3xl border-3 ${bgColor} ${borderColor} shadow-md
        flex flex-col items-center justify-center gap-3 p-4
        transition-colors active:scale-95 disabled:opacity-60`}
      onClick={onTap}
      disabled={isDisabled}
      variants={state === 'correct' ? correctVariants : wrongVariants}
      initial="initial"
      animate={state !== 'idle' && state !== 'disabled' ? state : 'initial'}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      aria-label={`${entry.name} を選ぶ`}
    >
      {/* Pokemon avatar circle */}
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center shadow-inner text-white text-3xl font-bold overflow-hidden relative"
        style={{ backgroundColor: typeColor }}
      >
        <PokemonImage id={entry.id} name={entry.name} className="w-24 h-24" />
      </div>
      {/* Pokemon name */}
      <span className="text-base font-black text-gray-800 leading-tight text-center">
        {entry.name}
      </span>
    </motion.button>
  );
}
