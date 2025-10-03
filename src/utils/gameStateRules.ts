import type { Board } from '@/types/types';
import { Colors } from '@/types/types';

import { isKingInCheck } from './gameStateHelpers';
import { isValidMove } from './moveValidation';

export const isCheckmate = (board: Board, kingColor: Colors): boolean => {
  if (!isKingInCheck(board, kingColor)) return false;

  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (piece && piece.color === kingColor) {
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
            if (
              isValidMove(board, [fromRow, fromCol], [toRow, toCol], kingColor)
            ) {
              return false;
            }
          }
        }
      }
    }
  }

  return true;
};

export const isStalemate = (board: Board, currentPlayer: Colors): boolean => {
  if (isKingInCheck(board, currentPlayer)) {
    return false;
  }

  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (piece && piece.color === currentPlayer) {
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
            if (
              isValidMove(
                board,
                [fromRow, fromCol],
                [toRow, toCol],
                currentPlayer
              )
            ) {
              return false;
            }
          }
        }
      }
    }
  }

  return true;
};
