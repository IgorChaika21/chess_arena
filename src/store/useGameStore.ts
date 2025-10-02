import { create } from 'zustand';

import { INITIAL_BOARD } from '@/constants/constants';
import type { Board, BoardPosition } from '@/types/types';
import { Colors } from '@/types/types';

interface GameState {
  board: Board;
  currentPlayer: Colors;
  selectedSquare: BoardPosition | null;

  setBoard: (board: Board) => void;
  setCurrentPlayer: (player: Colors) => void;
  setSelectedSquare: (square: BoardPosition | null) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>(set => ({
  board: INITIAL_BOARD,
  currentPlayer: Colors.WHITE,
  selectedSquare: null,

  setBoard: board => set({ board }),
  setCurrentPlayer: player => set({ currentPlayer: player }),
  setSelectedSquare: square => set({ selectedSquare: square }),
  resetGame: () =>
    set({
      board: INITIAL_BOARD,
      currentPlayer: Colors.WHITE,
      selectedSquare: null,
    }),
}));
