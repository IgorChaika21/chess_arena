import type {
  Board,
  BotMoveResult,
  CapturedPieces,
  Colors,
  MoveHistory,
  PromotionPieceType,
  BoardPosition,
} from '@/types/types';
import { FigureNames } from '@/types/types';

import { applyMove } from './applyMove';
import { handleRegularMove } from './regularMove';

export function handleBotMove(
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  currentPlayer: Colors,
  enPassantTarget: BoardPosition | null,
  capturedPieces: CapturedPieces,
  moveHistory: MoveHistory
): BotMoveResult {
  const quick = handleRegularMove(
    board,
    from,
    to,
    enPassantTarget,
    capturedPieces
  );
  const promotionPieceType = quick.promotionRequired
    ? (FigureNames.QUEEN as PromotionPieceType)
    : undefined;

  return applyMove({
    board,
    from,
    to,
    currentPlayer,
    enPassantTarget,
    capturedPieces,
    moveHistory,
    promotionPieceType,
  });
}
