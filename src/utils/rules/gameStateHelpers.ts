import type { Board, BoardPosition } from '@/types/types';
import { Colors, FigureNames } from '@/types/types';

import { isValidMove } from './moveValidation';

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
        if (isValidMove(board, [r, c], [row, col], attackingColor)) {
          return true;
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

  newBoard[to[0]][to[1]] = { ...piece };
  newBoard[fromRow][fromCol] = null;

  return isKingInCheck(newBoard, currentPlayer);
};
