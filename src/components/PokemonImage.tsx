'use client';

import { useState, useEffect } from 'react';

interface PokemonImageProps {
  id: number;
  name: string;
  className?: string;
  isSilhouette?: boolean;
}

export default function PokemonImage({ id, name, className = "w-10 h-10", isSilhouette = false }: PokemonImageProps) {
  const formattedId = id ? String(id).padStart(3, '0') : '';
  const initialSrc = id 
    ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`
    : '';

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [fallbackStep, setFallbackStep] = useState(0); 

  useEffect(() => {
    const freshFormattedId = id ? String(id).padStart(3, '0') : '';
    setImgSrc(id ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${freshFormattedId}.png` : '');
    setFallbackStep(0);
  }, [id]);

  const handleImageError = () => {
    if (fallbackStep === 0) {
      // Fallback 1: PokeAPI Official Artwork
      setImgSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`);
      setFallbackStep(1);
    } else if (fallbackStep === 1) {
      // Fallback 2: PokeAPI Normal sprite
      setImgSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);
      setFallbackStep(2);
    } else {
      // Fallback 3: Text only
      setFallbackStep(3);
    }
  };

  if (fallbackStep >= 3 || !id) {
    return (
      <span className="text-xl font-bold select-none">
        {name ? name.charAt(0) : '?'}
      </span>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={name}
      className={`${className} object-contain transition-all duration-300
        ${isSilhouette ? 'brightness-0 opacity-20' : 'hover:scale-110'}`}
      onError={handleImageError}
      draggable={false}
    />
  );
}
