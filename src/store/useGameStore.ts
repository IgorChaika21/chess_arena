import { create } from 'zustand';

import { Colors, GameStatus } from '@/types/types';

interface GameState {
  currentPlayer: Colors;
  gameStatus: GameStatus;
  darkMode: boolean;
  gameStarted: boolean;
  resignedPlayer: Colors | null;

  setCurrentPlayer: (player: Colors) => void;
  setGameStatus: (status: GameStatus) => void;
  toggleTheme: () => void;
  resetGame: () => void;
  startGame: () => void;
  resign: (player: Colors) => void;
}

export const useGameStore = create<GameState>(set => ({
  currentPlayer: Colors.WHITE,
  gameStatus: GameStatus.IN_PROGRESS,
  darkMode: true,
  gameStarted: false,
  resignedPlayer: null,

  setCurrentPlayer: player => set({ currentPlayer: player }),
  setGameStatus: status => set({ gameStatus: status }),
  toggleTheme: () => set(state => ({ darkMode: !state.darkMode })),

  resetGame: () =>
    set({
      currentPlayer: Colors.WHITE,
      gameStatus: GameStatus.IN_PROGRESS,
      gameStarted: false,
      resignedPlayer: null,
    }),

  startGame: () =>
    set({
      gameStarted: true,
      currentPlayer: Colors.WHITE,
      gameStatus: GameStatus.IN_PROGRESS,
      resignedPlayer: null,
    }),

  resign: (player: Colors) =>
    set({
      resignedPlayer: player,
      gameStatus: GameStatus.CHECKMATE,
    }),
}));

export function useEffectiveGameStatus() {
  const gameStatus = useGameStore(state => state.gameStatus);
  const resignedPlayer = useGameStore(state => state.resignedPlayer);

  return resignedPlayer ? GameStatus.CHECKMATE : gameStatus;
}
