import { create } from 'zustand';

import { Colors, GameStatus } from '@/types/types';

interface GameState {
  currentPlayer: Colors;
  gameStatus: GameStatus;
  darkMode: boolean;
  gameStarted: boolean;

  setCurrentPlayer: (player: Colors) => void;
  setGameStatus: (status: GameStatus) => void;
  toggleTheme: () => void;
  resetGame: () => void;
  startGame: () => void;
}

export const useGameStore = create<GameState>(set => ({
  currentPlayer: Colors.WHITE,
  gameStatus: GameStatus.IN_PROGRESS,
  darkMode: true,
  gameStarted: false,

  setCurrentPlayer: player => set({ currentPlayer: player }),
  setGameStatus: status => set({ gameStatus: status }),
  toggleTheme: () => set(state => ({ darkMode: !state.darkMode })),

  resetGame: () =>
    set({
      currentPlayer: Colors.WHITE,
      gameStatus: GameStatus.IN_PROGRESS,
      gameStarted: false,
    }),

  startGame: () =>
    set({
      gameStarted: true,
      currentPlayer: Colors.WHITE,
      gameStatus: GameStatus.IN_PROGRESS,
    }),
}));
