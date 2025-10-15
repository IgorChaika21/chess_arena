import { Colors, FigureNames, GameStatus } from '../types/types';
import type { Board } from '../types/types';

export const columnLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const rowLabels = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const gameStatusText: Record<GameStatus, string> = {
  [GameStatus.CHECK]: 'Check!',
  [GameStatus.CHECKMATE]: 'Checkmate!',
  [GameStatus.STALEMATE]: 'Stalemate!',
  [GameStatus.IN_PROGRESS]: 'In Progress',
};

export const INITIAL_BOARD: Board = [
  [
    { color: Colors.BLACK, type: FigureNames.ROOK, hasMoved: false },
    { color: Colors.BLACK, type: FigureNames.KNIGHT },
    { color: Colors.BLACK, type: FigureNames.BISHOP },
    { color: Colors.BLACK, type: FigureNames.QUEEN },
    { color: Colors.BLACK, type: FigureNames.KING, hasMoved: false },
    { color: Colors.BLACK, type: FigureNames.BISHOP },
    { color: Colors.BLACK, type: FigureNames.KNIGHT },
    { color: Colors.BLACK, type: FigureNames.ROOK, hasMoved: false },
  ],
  Array(8)
    .fill(null)
    .map(() => ({
      color: Colors.BLACK,
      type: FigureNames.PAWN,
      hasMoved: false,
    })),
  ...Array(4)
    .fill(null)
    .map(() => Array(8).fill(null)),
  Array(8)
    .fill(null)
    .map(() => ({
      color: Colors.WHITE,
      type: FigureNames.PAWN,
      hasMoved: false,
    })),
  [
    { color: Colors.WHITE, type: FigureNames.ROOK, hasMoved: false },
    { color: Colors.WHITE, type: FigureNames.KNIGHT },
    { color: Colors.WHITE, type: FigureNames.BISHOP },
    { color: Colors.WHITE, type: FigureNames.QUEEN },
    { color: Colors.WHITE, type: FigureNames.KING, hasMoved: false },
    { color: Colors.WHITE, type: FigureNames.BISHOP },
    { color: Colors.WHITE, type: FigureNames.KNIGHT },
    { color: Colors.WHITE, type: FigureNames.ROOK, hasMoved: false },
  ],
];
