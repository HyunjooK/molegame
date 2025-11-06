import { SaveData, GameLevel } from '../types';

const STORAGE_KEY = 'korean-whack-a-mole-save';

// 기본 저장 데이터
const defaultSaveData: SaveData = {
  highScores: {
    1: 0,
    2: 0,
    3: 0
  },
  levelProgress: {
    1: false,
    2: false,
    3: false
  },
  totalGamesPlayed: 0,
  totalCorrectAnswers: 0
};

// 저장 데이터 불러오기
export function loadSaveData(): SaveData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultSaveData, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Failed to load save data:', error);
  }
  return defaultSaveData;
}

// 저장 데이터 저장하기
export function saveSaveData(data: SaveData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

// 최고 점수 업데이트
export function updateHighScore(level: GameLevel, score: number): void {
  const data = loadSaveData();
  if (score > data.highScores[level]) {
    data.highScores[level] = score;
    saveSaveData(data);
  }
}

// 레벨 진행 상황 업데이트
export function updateLevelProgress(level: GameLevel, completed: boolean): void {
  const data = loadSaveData();
  data.levelProgress[level] = completed;
  saveSaveData(data);
}

// 게임 통계 업데이트
export function updateGameStats(correctAnswers: number): void {
  const data = loadSaveData();
  data.totalGamesPlayed += 1;
  data.totalCorrectAnswers += correctAnswers;
  saveSaveData(data);
}


