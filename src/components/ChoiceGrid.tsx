'use client';

import { QuizChoice, ChoiceState } from '@/types';
import PokemonChoice from './PokemonChoice';

interface ChoiceGridProps {
  choices: QuizChoice[];
  choiceStates: ChoiceState[];
  onChoiceTap: (index: number) => void;
}

export default function ChoiceGrid({ choices, choiceStates, onChoiceTap }: ChoiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-xl px-4">
      {choices.map((entry, index) => (
        <PokemonChoice
          key={`${entry.name}-${index}`}
          entry={entry}
          state={choiceStates[index]}
          onTap={() => onChoiceTap(index)}
        />
      ))}
    </div>
  );
}
