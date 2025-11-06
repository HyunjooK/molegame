import React from 'react';
import { GameLevel } from '../types';
import { levelData } from '../data/gameData';
import { loadSaveData } from '../utils/storage';

interface MainMenuProps {
  onStartGame: (level: GameLevel) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const saveData = loadSaveData();

  return (
    <div className="main-menu">
      <div className="menu-container">
        <h1 className="game-title">
          🎯 한글 두더지 잡기
        </h1>
        <p className="game-subtitle">재미있게 한글을 배워요!</p>

        <div className="level-selection">
          <h2>레벨을 선택하세요</h2>
          <div className="level-buttons">
            {[1, 2, 3].map(level => {
              const data = levelData[level as GameLevel];
              const highScore = saveData.highScores[level as GameLevel];
              
              return (
                <button
                  key={level}
                  className="level-button"
                  onClick={() => onStartGame(level as GameLevel)}
                >
                  <div className="level-badge">레벨 {level}</div>
                  <div className="level-name">{data.name}</div>
                  <div className="level-description">{data.description}</div>
                  {highScore > 0 && (
                    <div className="level-high-score">
                      최고 점수: {highScore}점
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="game-info">
          <div className="info-item">
            <span className="info-icon">⏱️</span>
            <span>제한 시간: 60초</span>
          </div>
          <div className="info-item">
            <span className="info-icon">✅</span>
            <span>정답: +10점</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🔥</span>
            <span>콤보 보너스</span>
          </div>
        </div>

        <div className="stats-summary">
          <p>총 게임 횟수: {saveData.totalGamesPlayed}</p>
          <p>총 정답 수: {saveData.totalCorrectAnswers}</p>
        </div>
      </div>
    </div>
  );
};


