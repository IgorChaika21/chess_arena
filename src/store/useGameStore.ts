import { create } from 'zustand';

import { Colors, GameStatus, GameMode } from '@/types/types';
import type { CapturedPieces, MoveHistory } from '@/types/types';

interface GameState {
  currentPlayer: Colors;
  gameStatus: GameStatus;
  darkMode: boolean;
  gameStarted: boolean;
  resignedPlayer: Colors | null;
  capturedPieces: CapturedPieces;
  moveHistory: MoveHistory;
  playerColor: Colors;
  gameMode: GameMode;

  setCurrentPlayer: (player: Colors) => void;
  setGameStatus: (status: GameStatus) => void;
  toggleTheme: () => void;
  resetGame: () => void;
  startGame: (mode?: GameMode, playerColor?: Colors) => void;
  resign: (player: Colors) => void;
  setCapturedPieces: (pieces: CapturedPieces) => void;
  setMoveHistory: (history: MoveHistory) => void;
  setPlayerColor: (color: Colors) => void;
  setGameMode: (mode: GameMode) => void;
}

export const useGameStore = create<GameState>(set => ({
  currentPlayer: Colors.WHITE,
  gameStatus: GameStatus.IN_PROGRESS,
  darkMode: true,
  gameStarted: false,
  resignedPlayer: null,
  capturedPieces: { white: [], black: [] },
  moveHistory: [],
  playerColor: Colors.WHITE,
  gameMode: GameMode.PVP,

  setCurrentPlayer: player => set({ currentPlayer: player }),
  setGameStatus: status => set({ gameStatus: status }),
  setCapturedPieces: (pieces: CapturedPieces) =>
    set({ capturedPieces: pieces }),
  setMoveHistory: (history: MoveHistory) => set({ moveHistory: history }),
  setPlayerColor: (color: Colors) => set({ playerColor: color }),
  setGameMode: (mode: GameMode) => set({ gameMode: mode }),

  toggleTheme: () => set(state => ({ darkMode: !state.darkMode })),

  resetGame: () =>
    set({
      currentPlayer: Colors.WHITE,
      gameStatus: GameStatus.IN_PROGRESS,
      gameStarted: false,
      resignedPlayer: null,
      capturedPieces: { white: [], black: [] },
      moveHistory: [],
      playerColor: Colors.WHITE,
      gameMode: GameMode.PVP,
    }),

  startGame: (mode, color = Colors.WHITE) => {
    set({
      gameMode: mode,
      playerColor: color,
      gameStarted: true,
      currentPlayer: Colors.WHITE,
      gameStatus: GameStatus.IN_PROGRESS,
      capturedPieces: { white: [], black: [] },
      moveHistory: [],
      resignedPlayer: null,
    });
  },

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
