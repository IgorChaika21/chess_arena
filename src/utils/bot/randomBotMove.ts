import type { Board, BoardPosition } from '@/types/types';
import { Colors } from '@/types/types';

import { isValidMove } from '../rules/moveValidation';

export const getRandomMove = (
  board: Board,
  currentPlayer: Colors,
  enPassantTarget: BoardPosition | null = null
) => {
  const possibleMoves: {
    from: BoardPosition;
    to: BoardPosition;
  }[] = [];

  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (piece && piece.color === currentPlayer) {
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
            if (fromRow === toRow && fromCol === toCol) continue;

            if (
              isValidMove(
                board,
                [fromRow, fromCol],
                [toRow, toCol],
                enPassantTarget,
                currentPlayer
              )
            ) {
              possibleMoves.push({
                from: [fromRow, fromCol],
                to: [toRow, toCol],
              });
            }
          }
        }
      }
    }
  }

  if (possibleMoves.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[randomIndex];
};
