'use client';

import { motion } from 'framer-motion';
import { ChoiceState } from '@/types';

interface ReverseChoiceCardProps {
  kana: string;
  state: ChoiceState;
  onTap: () => void;
}

export default function ReverseChoiceCard({ kana, state, onTap }: ReverseChoiceCardProps) {
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

  const isDisabled = state === 'disabled' || state === 'correct' || state === 'wrong';

  const correctVariants = {
    initial: { scale: 1 },
    correct: {
      scale: [1, 1.15, 1.05, 1],
      transition: { duration: 0.45 },
    },
  };

  const wrongVariants = {
    initial: { x: 0 },
    wrong: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.button
      className={`min-h-[100px] min-w-[100px] w-full rounded-2xl border-3 ${bgColor} ${borderColor}
        flex items-center justify-center p-3
        transition-colors active:scale-95 disabled:opacity-60`}
      onClick={onTap}
      disabled={isDisabled}
      variants={state === 'correct' ? correctVariants : wrongVariants}
      initial="initial"
      animate={state !== 'idle' && state !== 'disabled' ? state : 'initial'}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      aria-label={`ひらがな ${kana} を選ぶ`}
    >
      <span className="text-5xl font-bold text-brand-purple select-none">
        {kana}
      </span>
    </motion.button>
  );
}
