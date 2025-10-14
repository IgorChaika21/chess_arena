import type { Board, BoardPosition } from '@/types/types';
import { Colors, FigureNames } from '@/types/types';

import { doesMovePutKingInCheck } from './gameStateHelpers';
import {
  isValidPawnMove,
  isValidRookMove,
  isValidKnightMove,
  isValidBishopMove,
  isValidQueenMove,
  isValidKingMove,
} from './pieceRules';

export const isValidMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  enPassantTarget: BoardPosition | null,
  currentPlayer: Colors
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];

  if (!piece) return false;
  if (piece.color !== currentPlayer) return false;
  if (targetPiece && targetPiece.color === piece.color) return false;

  switch (piece.type) {
    case FigureNames.PAWN:
      if (!isValidPawnMove(board, from, to, enPassantTarget, piece.color))
        return false;
      break;
    case FigureNames.ROOK:
      if (!isValidRookMove(board, from, to)) return false;
      break;
    case FigureNames.KNIGHT:
      if (!isValidKnightMove(from, to)) return false;
      break;
    case FigureNames.BISHOP:
      if (!isValidBishopMove(board, from, to)) return false;
      break;
    case FigureNames.QUEEN:
      if (!isValidQueenMove(board, from, to)) return false;
      break;
    case FigureNames.KING:
      if (
        !isValidKingMove(
          board,
          from,
          to,
          piece.hasMoved || false,
          currentPlayer
        )
      )
        return false;
      break;
    default:
      return false;
  }

  if (doesMovePutKingInCheck(board, from, to, currentPlayer)) {
    return false;
  }

  return true;
};
