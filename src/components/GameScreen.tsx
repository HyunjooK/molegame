import React from 'react';
import { GameLevel } from '../types';
import { useGameLogic } from '../hooks/useGameLogic';
import { MoleHole } from './MoleHole';

interface GameScreenProps {
  level: GameLevel;
  onGameEnd: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ level, onGameEnd }) => {
  const {
    moles,
    timeLeft,
    stats,
    targetText,
    isPlaying,
    gameResult,
    startGame,
    endGame,
    handleMoleClick
  } = useGameLogic(level);

  // 게임이 시작되지 않았으면 시작 버튼 표시
  if (!isPlaying && !gameResult) {
    return (
      <div className="game-screen">
        <div className="game-ready">
          <h2>레벨 {level} 준비!</h2>
          <p>화면에 나타나는 두더지를 클릭하세요</p>
          <button className="start-button" onClick={startGame}>
            게임 시작
          </button>
          <button className="back-button" onClick={onGameEnd}>
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 게임이 끝났으면 결과 화면으로
  if (gameResult) {
    return (
      <div className="game-screen">
        <div className="game-result">
          <h2>게임 종료!</h2>
          <div className="stars">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={i < gameResult.stars ? 'star filled' : 'star'}>
                ⭐
              </span>
            ))}
          </div>
          <div className="result-stats">
            <div className="result-item">
              <span className="result-label">최종 점수</span>
              <span className="result-value">{gameResult.score}점</span>
            </div>
            <div className="result-item">
              <span className="result-label">정답</span>
              <span className="result-value">{gameResult.correctClicks}개</span>
            </div>
            <div className="result-item">
              <span className="result-label">오답</span>
              <span className="result-value">{gameResult.wrongClicks}개</span>
            </div>
            <div className="result-item">
              <span className="result-label">최대 콤보</span>
              <span className="result-value">{gameResult.maxCombo}회</span>
            </div>
          </div>
          
          <div className="result-message">
            {gameResult.stars === 3 && '🎉 완벽해요! 대단해요!'}
            {gameResult.stars === 2 && '👏 잘했어요! 조금만 더!'}
            {gameResult.stars === 1 && '💪 좋아요! 다시 도전해봐요!'}
            {gameResult.stars === 0 && '😊 괜찮아요! 다음엔 더 잘할 거예요!'}
          </div>

          <div className="result-buttons">
            <button className="restart-button" onClick={startGame}>
              다시 하기
            </button>
            <button className="menu-button" onClick={onGameEnd}>
              메인 메뉴
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 게임 중
  return (
    <div className="game-screen">
      <div className="game-header">
        <div className="timer">
          <span className="timer-icon">⏱️</span>
          <span className="timer-value">{timeLeft}초</span>
        </div>
        <div className="score">
          <span className="score-label">점수</span>
          <span className="score-value">{stats.score}</span>
        </div>
      </div>
      
      <div className="mission-banner">
        <div className="mission-text">"{targetText}"를 찾으세요!</div>
      </div>

      <div className="game-board">
        {moles.map(mole => (
          <MoleHole
            key={mole.id}
            mole={mole}
            onClick={() => handleMoleClick(mole.id)}
          />
        ))}
      </div>

      <div className="game-footer">
        <div className="combo">
          {stats.combo >= 3 && (
            <span className="combo-text">🔥 {stats.combo} 콤보!</span>
          )}
        </div>
        <button className="pause-button" onClick={endGame}>
          일시정지
        </button>
      </div>
    </div>
  );
};


