import { useEffect } from 'react';

import { useGameStore } from '@/store/useGameStore';

import { useBoardState } from './useBoardState';
import { useBotPlayer } from './useBotPlayer';
import { useMoveHandler } from './useMoveHandler';

export default function useChessGame() {
  const boardState = useBoardState();
  const moveHandler = useMoveHandler(boardState);
  const { gameStarted } = useGameStore();

  useBotPlayer({
    boardState: boardState,
  });

  useEffect(() => {
    if (!gameStarted) {
      boardState.resetBoard();
    }
  }, [boardState, gameStarted]);

  return {
    ...boardState,
    ...moveHandler,
  };
}
