'use client';

import { motion } from 'framer-motion';

interface RowProgressBarProps {
  progress: number; // 0-100
  height?: number;
}

export default function RowProgressBar({ progress, height = 8 }: RowProgressBarProps) {
  return (
    <div
      className="w-full rounded-full bg-gray-200 overflow-hidden"
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`進捗 ${progress}%`}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-greenLight"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}
