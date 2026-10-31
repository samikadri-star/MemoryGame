export type GameMode = 'PAIRS' | 'FLASH_RECALL' | 'MATRIX_SEQUENCE';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'MASTER';

export interface DifficultyConfig {
  id: DifficultyLevel;
  name: { en: string; ar: string };
  gridRows: number;
  gridCols: number;
  totalCards: number; // gridRows * gridCols
  pairCount: number;  // totalCards / 2
  memorizeSeconds: number; // for FLASH_RECALL or preview
}

export type ThemeId = 'CELESTIAL' | 'CYBER_ARTIFACT' | 'NATURE_SPIRIT' | 'ELEMENTAL';

export interface CardArtwork {
  id: string;
  themeId: ThemeId;
  name: { en: string; ar: string };
  imageSrc?: string;
  svgIcon?: string;
  primaryColor: string;
  glowColor: string;
  description: { en: string; ar: string };
}

export interface CardItem {
  instanceId: string;
  artworkId: string;
  artwork: CardArtwork;
  gridIndex: number;
  isFaceUp: boolean;
  isMatched: boolean;
  isHighlighted?: boolean;
  isWrong?: boolean;
}

export interface GameScoreRecord {
  id: string;
  date: string;
  timestamp: number;
  mode: GameMode;
  difficulty: DifficultyLevel;
  theme: ThemeId;
  score: number;
  moves: number;
  timeSeconds: number;
  accuracy: number;
  grade: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
}

export type GameState = 'TITLE' | 'MEMORIZE' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'GAME_OVER';

export type Language = 'ar' | 'en';
