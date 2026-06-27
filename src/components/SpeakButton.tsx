'use client';

import { motion } from 'framer-motion';

interface SpeakButtonProps {
  onSpeak: () => void;
  label?: string;
}

export default function SpeakButton({ onSpeak, label = 'きく' }: SpeakButtonProps) {
  return (
    <motion.button
      className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple text-white 
        font-bold text-lg shadow-lg hover:bg-brand-purpleLight active:scale-95
        transition-colors"
      onClick={onSpeak}
      whileTap={{ scale: 0.9 }}
      aria-label="音声を聞く"
    >
      {/* Speaker icon SVG */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
        <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.07 5.93C19.9447 7.80528 20.9979 10.3478 20.9979 13C20.9979 15.6522 19.9447 18.1947 18.07 20.07" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </motion.button>
  );
}
