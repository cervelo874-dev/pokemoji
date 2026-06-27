'use client';

import { motion } from 'framer-motion';

interface KanaCardProps {
  kana: string;
  size?: 'large' | 'medium' | 'small';
}

export default function KanaCard({ kana, size = 'large' }: KanaCardProps) {
  const sizeClasses = {
    large: 'w-36 h-36 text-7xl',
    medium: 'w-24 h-24 text-5xl',
    small: 'w-16 h-16 text-3xl',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-brand-purplePale flex items-center justify-center shadow-lg`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      aria-label={`ひらがな ${kana}`}
    >
      <span className="text-brand-purple font-bold select-none leading-none">
        {kana}
      </span>
    </motion.div>
  );
}
