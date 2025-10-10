import type {
  Board,
  ChessPiece,
  PromotionPieceType,
  BoardPosition,
} from '@/types/types';

import { getMoveNotation } from './chessNotation';

export const createMoveRecord = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  capturedPiece: ChessPiece | null,
  promotion?: PromotionPieceType
) => {
  const [fromRow, fromCol] = from;
  const piece = board[fromRow][fromCol];

  if (!piece) {
    throw new Error('No piece at from position');
  }

  const notation = getMoveNotation(board, from, to, capturedPiece, promotion);

  return {
    from,
    to,
    piece,
    capturedPiece,
    promotion,
    notation,
  };
};
