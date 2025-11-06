import { useState, useEffect, useCallback, useRef } from 'react';
import { GameLevel, Mole, GameStats, GameResult } from '../types';
import { levelData, SCORE_CONFIG, STAR_THRESHOLDS } from '../data/gameData';
import { soundManager } from '../utils/sound';
import { updateHighScore, updateLevelProgress, updateGameStats } from '../utils/storage';

const GAME_DURATION = 60; // 60초
const NUM_HOLES = 9; // 3x3 그리드

export function useGameLogic(level: GameLevel) {
  const [moles, setMoles] = useState<Mole[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    correctClicks: 0,
    wrongClicks: 0,
    combo: 0,
    maxCombo: 0
  });
  const [targetText, setTargetText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const currentLevelData = levelData[level];

  // 두더지 초기화
  const initMoles = useCallback(() => {
    const initialMoles: Mole[] = Array.from({ length: NUM_HOLES }, (_, i) => ({
      id: i,
      text: '',
      isVisible: false,
      isCorrect: false
    }));
    setMoles(initialMoles);
  }, []);

  // 랜덤 텍스트 선택
  const getRandomText = useCallback((excludeTarget = false): string => {
    const contents = currentLevelData.contents;
    let available = excludeTarget 
      ? contents.filter(c => c !== targetText)
      : contents;
    
    if (available.length === 0) available = contents;
    
    return available[Math.floor(Math.random() * available.length)];
  }, [currentLevelData.contents, targetText]);

  // 새로운 타겟 설정
  const setNewTarget = useCallback(() => {
    const newTarget = getRandomText();
    setTargetText(newTarget);
    soundManager.speak(`${newTarget}을 찾아 클릭하세요`);
  }, [getRandomText]);

  // 두더지 등장
  const spawnMole = useCallback(() => {
    setMoles(prevMoles => {
      // 보이지 않는 구멍 찾기
      const hiddenHoles = prevMoles
        .map((mole, index) => ({ mole, index }))
        .filter(({ mole }) => !mole.isVisible);

      if (hiddenHoles.length === 0) return prevMoles;

      // 랜덤 구멍 선택
      const randomHole = hiddenHoles[Math.floor(Math.random() * hiddenHoles.length)];
      const holeIndex = randomHole.index;

      // 정답 또는 오답 결정 (정답 확률 40%)
      const isCorrect = Math.random() < 0.4;
      const text = isCorrect ? targetText : getRandomText(true);

      // 새로운 두더지 배열 생성
      const newMoles = [...prevMoles];
      newMoles[holeIndex] = {
        ...newMoles[holeIndex],
        text,
        isVisible: true,
        isCorrect
      };

      // 일정 시간 후 숨기기
      const hideTimeout = setTimeout(() => {
        setMoles(currentMoles => {
          const updatedMoles = [...currentMoles];
          updatedMoles[holeIndex] = {
            ...updatedMoles[holeIndex],
            isVisible: false,
            text: '',
            isCorrect: false
          };
          return updatedMoles;
        });
        hideTimeoutsRef.current.delete(holeIndex);
      }, currentLevelData.displayTime);

      hideTimeoutsRef.current.set(holeIndex, hideTimeout);

      return newMoles;
    });
  }, [targetText, getRandomText, currentLevelData.displayTime]);

  // 두더지 클릭 핸들러
  const handleMoleClick = useCallback((moleId: number) => {
    setMoles(prevMoles => {
      const clickedMole = prevMoles[moleId];
      
      if (!clickedMole.isVisible) return prevMoles;

      // 타임아웃 클리어
      const hideTimeout = hideTimeoutsRef.current.get(moleId);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeoutsRef.current.delete(moleId);
      }

      // 통계 업데이트
      setStats(prevStats => {
        const isCorrect = clickedMole.isCorrect;
        let newScore = prevStats.score;
        let newCombo = isCorrect ? prevStats.combo + 1 : 0;

        if (isCorrect) {
          // 정답
          let points = SCORE_CONFIG.CORRECT_ANSWER;
          
          // 콤보 보너스
          if (newCombo >= SCORE_CONFIG.COMBO_THRESHOLD) {
            points = Math.floor(points * SCORE_CONFIG.COMBO_MULTIPLIER);
            soundManager.playCombo();
          } else {
            soundManager.playCorrect();
          }
          
          newScore += points;
        } else {
          // 오답
          newScore += SCORE_CONFIG.WRONG_ANSWER;
          soundManager.playWrong();
        }

        // 점수는 0 이하로 내려가지 않음
        newScore = Math.max(0, newScore);

        return {
          score: newScore,
          correctClicks: prevStats.correctClicks + (isCorrect ? 1 : 0),
          wrongClicks: prevStats.wrongClicks + (isCorrect ? 0 : 1),
          combo: newCombo,
          maxCombo: Math.max(prevStats.maxCombo, newCombo)
        };
      });

      // 두더지 숨기기
      const newMoles = [...prevMoles];
      newMoles[moleId] = {
        ...newMoles[moleId],
        isVisible: false,
        text: '',
        isCorrect: false
      };

      return newMoles;
    });
  }, []);

  // 게임 시작
  const startGame = useCallback(() => {
    // 초기화
    initMoles();
    setTimeLeft(GAME_DURATION);
    setStats({
      score: 0,
      correctClicks: 0,
      wrongClicks: 0,
      combo: 0,
      maxCombo: 0
    });
    setGameResult(null);
    setIsPlaying(true);

    // 타겟 설정
    setNewTarget();

    // 타이머 시작
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 두더지 스폰 시작
    spawnIntervalRef.current = setInterval(() => {
      spawnMole();
    }, currentLevelData.spawnInterval);

  }, [initMoles, setNewTarget, spawnMole, currentLevelData.spawnInterval]);

  // 게임 종료
  const endGame = useCallback(() => {
    setIsPlaying(false);

    // 모든 인터벌과 타임아웃 정리
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    hideTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    hideTimeoutsRef.current.clear();

    // 결과 계산
    const finalScore = stats.score + (timeLeft * SCORE_CONFIG.TIME_BONUS_PER_SECOND);
    let stars = 0;
    if (finalScore >= STAR_THRESHOLDS.THREE_STARS) stars = 3;
    else if (finalScore >= STAR_THRESHOLDS.TWO_STARS) stars = 2;
    else if (finalScore >= STAR_THRESHOLDS.ONE_STAR) stars = 1;

    const result: GameResult = {
      score: finalScore,
      correctClicks: stats.correctClicks,
      wrongClicks: stats.wrongClicks,
      maxCombo: stats.maxCombo,
      stars
    };

    setGameResult(result);

    // 저장
    updateHighScore(level, finalScore);
    updateGameStats(stats.correctClicks);
    if (stars >= 1) {
      updateLevelProgress(level, true);
    }

  }, [stats, timeLeft, level]);

  // 시간 종료 감지
  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      endGame();
    }
  }, [isPlaying, timeLeft, endGame]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      hideTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return {
    moles,
    timeLeft,
    stats,
    targetText,
    isPlaying,
    gameResult,
    startGame,
    endGame,
    handleMoleClick
  };
}


