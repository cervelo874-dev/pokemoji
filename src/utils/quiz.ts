import { KanaEntry, QuizQuestion, ReverseQuizQuestion, QuizChoice } from '@/types';
import { KANA_DATA, getRowEntries, getNonSpecialEntries } from '@/data/hiraganaData';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Convert a KanaEntry to a QuizChoice by selecting one of its pokemons randomly
function selectRandomPokemonChoice(entry: KanaEntry): QuizChoice {
  const pokemons = entry.pokemons || [];
  if (pokemons.length === 0) {
    return {
      kana: entry.kana,
      name: entry.kana,
      id: 0,
      type: 'ノーマル',
    };
  }
  const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
  return {
    kana: entry.kana,
    name: randomPokemon.name,
    id: randomPokemon.id,
    type: randomPokemon.type,
  };
}

export function generateQuiz(currentEntry: KanaEntry): QuizQuestion {
  const allNonSpecial = getNonSpecialEntries();
  
  // Get distractors: prefer same row first, then others
  const sameRowEntries = getRowEntries(currentEntry.row)
    .filter(e => e.kana !== currentEntry.kana && !e.special);
  const otherEntries = allNonSpecial
    .filter(e => e.row !== currentEntry.row);
  
  const distractorPool = [...shuffleArray(sameRowEntries), ...shuffleArray(otherEntries)];
  const distractors = distractorPool.slice(0, 3);
  
  const correctChoice = selectRandomPokemonChoice(currentEntry);
  const choices = shuffleArray([
    correctChoice,
    ...distractors.map(d => selectRandomPokemonChoice(d)),
  ]);
  
  return {
    kana: currentEntry.kana,
    correctChoice,
    choices,
    isReverse: false,
  };
}

// For を and ん - reverse format: show kana choices instead of pokemon
export function generateReverseQuiz(kana: string): ReverseQuizQuestion {
  // Confusable characters for を and ん
  const confusables: Record<string, string[]> = {
    'を': ['わ', 'お', 'あ'],
    'ん': ['れ', 'わ', 'そ'],
  };
  
  const distractors = confusables[kana] || ['あ', 'い', 'う'];
  const choices = shuffleArray([kana, ...distractors]);
  
  return {
    kana,
    choices,
    correctKana: kana,
    isReverse: true,
  };
}

export function generateRowQuestions(rowId: string): string[] {
  const entries = getRowEntries(rowId);
  return shuffleArray(entries.map(e => e.kana));
}

export function generateRandomQuestions(): string[] {
  const allKana = KANA_DATA.map(e => e.kana);
  return shuffleArray(allKana).slice(0, 10); // Pick 10 random questions
}
