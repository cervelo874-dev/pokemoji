'use client';

import { motion } from 'framer-motion';
import { KanaEntry } from '@/types';
import { TYPE_COLORS } from '@/data/hiraganaData';
import PokemonImage from './PokemonImage';

interface ZukanSlotProps {
  entry: KanaEntry;
  isCollected: (pokemonName: string) => boolean;
  onTapPokemon: (pokemonName: string) => void;
}

export default function ZukanSlot({ entry, isCollected, onTapPokemon }: ZukanSlotProps) {
  return (
    <div className="flex flex-col items-center p-3 rounded-2xl bg-white shadow-md border-2 border-brand-purplePale w-full max-w-[170px] min-w-[130px]">
      {/* Kana letter on top */}
      <span className="text-3xl font-black text-brand-purple mb-3 select-none">
        {entry.kana}
      </span>

      {/* Pokemons row */}
      {entry.special || !entry.pokemons ? (
        // Special characters without pokemons (を, ん)
        <div className="flex justify-center items-center min-h-[48px] text-xs font-bold text-gray-400">
          とくべつな もじ
        </div>
      ) : (
        <div className="flex justify-center gap-1 w-full flex-wrap">
          {entry.pokemons.map((pokemon) => {
            const collected = isCollected(pokemon.name);
            const typeColor = pokemon.type ? TYPE_COLORS[pokemon.type] : '#A8A878';

            return (
              <motion.button
                key={pokemon.name}
                className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm overflow-hidden relative border
                  ${collected ? 'border-gray-200 bg-white' : 'border-gray-300 bg-gray-200 cursor-not-allowed'}`}
                style={collected ? { backgroundColor: typeColor } : undefined}
                onClick={() => collected && onTapPokemon(pokemon.name)}
                disabled={!collected}
                whileTap={collected ? { scale: 0.9 } : undefined}
                aria-label={collected ? `${pokemon.name} のなまえをきく` : 'まだみつけていない'}
              >
                <PokemonImage
                  id={pokemon.id}
                  name={pokemon.name}
                  className="w-6 h-6"
                  isSilhouette={!collected}
                />
                {!collected && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-black/10">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C9.24 2 7 4.24 7 7V10H5V22H19V10H17V7C17 4.24 14.76 2 12 2ZM9 7C9 5.35 10.35 4 12 4C13.65 4 15 5.35 15 7V10H9V7ZM13 18H11V14H13V18Z" />
                    </svg>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Pokemon Names List below */}
      {!entry.special && entry.pokemons && (
        <div className="mt-2 flex flex-col gap-0.5 w-full text-center">
          {entry.pokemons.map((pokemon) => {
            const collected = isCollected(pokemon.name);
            return (
              <span
                key={pokemon.name}
                className={`text-[9px] font-bold truncate leading-none py-0.5
                  ${collected ? 'text-gray-800' : 'text-gray-400'}`}
              >
                {collected ? pokemon.name : '???'}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
