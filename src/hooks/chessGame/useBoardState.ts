import { useState, useCallback, useMemo } from 'react';

import { INITIAL_BOARD } from '@/constants/constants';
import type { Board, BoardPosition } from '@/types/types';

interface BoardState {
  board: Board;
  selectedSquare: BoardPosition | null;
  enPassantTarget: BoardPosition | null;
}

const createInitialState = (): BoardState => ({
  board: INITIAL_BOARD,
  selectedSquare: null,
  enPassantTarget: null,
});

export function useBoardState() {
  const [state, setState] = useState<BoardState>(createInitialState);

  const { board, selectedSquare, enPassantTarget } = state;

  const setBoard = useCallback((newBoard: Board) => {
    setState(prev => ({ ...prev, board: newBoard }));
  }, []);

  const setSelectedSquare = useCallback((square: BoardPosition | null) => {
    setState(prev => ({ ...prev, selectedSquare: square }));
  }, []);

  const setEnPassantTarget = useCallback((target: BoardPosition | null) => {
    setState(prev => ({ ...prev, enPassantTarget: target }));
  }, []);

  const resetBoard = useCallback(() => {
    setState(createInitialState());
  }, []);

  return useMemo(
    () => ({
      board,
      selectedSquare,
      enPassantTarget,
      setBoard,
      setSelectedSquare,
      setEnPassantTarget,
      resetBoard,
    }),
    [
      board,
      selectedSquare,
      enPassantTarget,
      setBoard,
      setSelectedSquare,
      setEnPassantTarget,
      resetBoard,
    ]
  );
}

export type UseBoardState = ReturnType<typeof useBoardState>;
