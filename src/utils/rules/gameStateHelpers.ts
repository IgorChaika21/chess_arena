import type { Board, BoardPosition } from '@/types/types';
import { Colors, FigureNames } from '@/types/types';

import {
  isValidPawnMove,
  isValidRookMove,
  isValidKnightMove,
  isValidBishopMove,
  isValidQueenMove,
  isValidKingMove,
} from './pieceRules';

export const isSquareUnderAttack = (
  board: Board,
  square: BoardPosition,
  attackingColor: Colors
): boolean => {
  const [row, col] = square;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === attackingColor) {
        switch (piece.type) {
          case FigureNames.PAWN:
            if (isValidPawnMove(board, [r, c], [row, col], null, piece.color))
              return true;
            break;
          case FigureNames.ROOK:
            if (isValidRookMove(board, [r, c], [row, col])) return true;
            break;
          case FigureNames.KNIGHT:
            if (isValidKnightMove([r, c], [row, col])) return true;
            break;
          case FigureNames.BISHOP:
            if (isValidBishopMove(board, [r, c], [row, col])) return true;
            break;
          case FigureNames.QUEEN:
            if (isValidQueenMove(board, [r, c], [row, col])) return true;
            break;
          case FigureNames.KING:
            if (
              isValidKingMove(
                board,
                [r, c],
                [row, col],
                piece.hasMoved || false,
                attackingColor
              )
            )
              return true;
            break;
        }
      }
    }
  }
  return false;
};

export const isKingInCheck = (board: Board, kingColor: Colors): boolean => {
  let kingPos: BoardPosition | null = null;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (
        piece &&
        piece.type === FigureNames.KING &&
        piece.color === kingColor
      ) {
        kingPos = [r, c];
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return false;

  return isSquareUnderAttack(
    board,
    kingPos,
    kingColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE
  );
};

export const doesMovePutKingInCheck = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  currentPlayer: Colors
): boolean => {
  const newBoard = [...board.map(row => [...row])];
  const [fromRow, fromCol] = from;
  const piece = newBoard[fromRow][fromCol];

  if (!piece) return false;

  newBoard[to[0]][to[1]] = { ...piece, hasMoved: true };
  newBoard[fromRow][fromCol] = null;

  return isKingInCheck(newBoard, currentPlayer);
};
