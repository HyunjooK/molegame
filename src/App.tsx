import { useState } from 'react';
import { GameLevel, GameState } from './types';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>(1);

  const handleStartGame = (level: GameLevel) => {
    setSelectedLevel(level);
    setGameState('playing');
  };

  const handleGameEnd = () => {
    setGameState('menu');
  };

  return (
    <div className="app">
      {gameState === 'menu' && (
        <MainMenu onStartGame={handleStartGame} />
      )}
      {gameState === 'playing' && (
        <GameScreen level={selectedLevel} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
}

export default App;


