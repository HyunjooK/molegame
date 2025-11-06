// 게임 레벨 타입
export type GameLevel = 1 | 2 | 3;

// 게임 상태 타입
export type GameState = 'menu' | 'playing' | 'result';

// 두더지 타입
export interface Mole {
  id: number;
  text: string;
  isVisible: boolean;
  isCorrect: boolean;
}

// 게임 설정 타입
export interface GameConfig {
  level: GameLevel;
  targetText: string;
  duration: number; // 초 단위
  spawnInterval: number; // 밀리초 단위
  displayTime: number; // 밀리초 단위
}

// 게임 통계 타입
export interface GameStats {
  score: number;
  correctClicks: number;
  wrongClicks: number;
  combo: number;
  maxCombo: number;
}

// 레벨 데이터 타입
export interface LevelData {
  level: GameLevel;
  name: string;
  description: string;
  contents: string[];
  spawnInterval: number;
  displayTime: number;
}

// 게임 결과 타입
export interface GameResult {
  score: number;
  correctClicks: number;
  wrongClicks: number;
  maxCombo: number;
  stars: number; // 0-3
}

// 로컬 스토리지 저장 데이터 타입
export interface SaveData {
  highScores: Record<GameLevel, number>;
  levelProgress: Record<GameLevel, boolean>;
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
}

// 사운드 설정 타입
export interface SoundSettings {
  backgroundMusic: boolean;
  soundEffects: boolean;
  voiceGuide: boolean;
}


