import type { Board } from '@/types/types';
import { Colors, GameStatus } from '@/types/types';

import { isKingInCheck } from './gameStateHelpers';
import { isCheckmate, isStalemate } from './gameStateRules';

export const getGameStatusAfterMove = (
  board: Board,
  currentPlayer: Colors
):
  | GameStatus.IN_PROGRESS
  | GameStatus.CHECK
  | GameStatus.CHECKMATE
  | GameStatus.STALEMATE => {
  const opponent = currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  const isOpponentInCheck = isKingInCheck(board, opponent);

  if (isOpponentInCheck) {
    return isCheckmate(board, opponent)
      ? GameStatus.CHECKMATE
      : GameStatus.CHECK;
  } else if (isStalemate(board, opponent)) {
    return GameStatus.STALEMATE;
  }
  return GameStatus.IN_PROGRESS;
};

export const getNextPlayer = (currentPlayer: Colors): Colors => {
  return currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
};
