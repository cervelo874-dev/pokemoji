export interface PokemonInfo {
  name: string;
  id: number;
  type: PokemonType;
}

export interface KanaEntry {
  kana: string;
  pokemons: PokemonInfo[] | null; // 3 alternate pokemons (null for special characters)
  row: RowId;
  special?: boolean;
}

export type PokemonType = 
  | 'どく' | 'ノーマル' | 'ほのお' | 'かくとう' | 'ドラゴン'
  | 'みず' | 'エスパー' | 'くさ' | 'あく' | 'ゴースト' | 'むし'
  | 'ひこう' | 'でんき';

export type RowId = 'a' | 'ka' | 'sa' | 'ta' | 'na' | 'ha' | 'ma' | 'ya' | 'ra' | 'wa' | 'random';

export interface RowMeta {
  id: RowId;
  label: string;
  kanaList: string[];
}

export interface CharProgress {
  seen: number;
  correct: number;
  mastered: boolean;
}

export interface RowProgress {
  unlocked: boolean;
  completed: boolean;
  chars: {
    [kana: string]: CharProgress;
  };
}

export interface ProgressData {
  version: 1;
  lastPlayed: string;
  rows: {
    [rowId: string]: RowProgress;
  };
  collection: string[];
}

export interface SettingsData {
  soundEnabled: boolean;
  volume: number;
}

export type ChoiceState = 'idle' | 'correct' | 'wrong' | 'disabled';

export interface QuizChoice {
  kana: string;
  name: string;
  id: number;
  type: PokemonType;
}

export interface QuizQuestion {
  kana: string;
  correctChoice: QuizChoice;
  choices: QuizChoice[];
  isReverse: boolean; // true for を・ん (reverse format)
}

export interface ReverseQuizQuestion {
  kana: string;
  choices: string[]; // hiragana choices
  correctKana: string;
  isReverse: true;
}
