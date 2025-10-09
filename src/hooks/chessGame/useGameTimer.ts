import { useState, useEffect } from 'react';

import { GameStatus } from '@/types/types';

export const useGameTimer = (gameStarted: boolean, gameStatus: GameStatus) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!gameStarted) {
      setTimeElapsed(0);
      return;
    }

    const shouldTimerRun =
      gameStatus === GameStatus.IN_PROGRESS || gameStatus === GameStatus.CHECK;

    if (!shouldTimerRun) {
      return;
    }

    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameStatus]);

  return timeElapsed;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
