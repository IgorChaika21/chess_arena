import { create } from 'zustand';

import { INITIAL_BOARD } from '@/constants/constants';
import type { Board, BoardPosition } from '@/types/types';
import { Colors, GameStatus } from '@/types/types';

interface GameState {
  board: Board;
  currentPlayer: Colors;
  selectedSquare: BoardPosition | null;
  gameStatus: GameStatus;
  darkMode: boolean;

  setBoard: (board: Board) => void;
  setCurrentPlayer: (player: Colors) => void;
  setSelectedSquare: (square: BoardPosition | null) => void;
  setGameStatus: (status: GameStatus) => void;
  toggleTheme: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>(set => ({
  board: INITIAL_BOARD,
  currentPlayer: Colors.WHITE,
  selectedSquare: null,
  gameStatus: GameStatus.IN_PROGRESS,
  darkMode: true,

  setBoard: board => set({ board }),
  setCurrentPlayer: player => set({ currentPlayer: player }),
  setSelectedSquare: square => set({ selectedSquare: square }),
  setGameStatus: status => set({ gameStatus: status }),
  toggleTheme: () => set(state => ({ darkMode: !state.darkMode })),
  resetGame: () =>
    set({
      board: INITIAL_BOARD,
      currentPlayer: Colors.WHITE,
      selectedSquare: null,
      gameStatus: GameStatus.IN_PROGRESS,
    }),
}));
