import type { ApplyMoveParams, ApplyMoveResult } from '@/types/types';

import { createMoveRecord } from '../notation/moveRecord';
import { getGameStatusAfterMove, getNextPlayer } from '../rules/gameState';

import { handlePromotionMove } from './promotionMove';
import { handleRegularMove } from './regularMove';

function applyPromotionMove(params: ApplyMoveParams): ApplyMoveResult {
  const {
    board,
    from,
    to,
    capturedPieces,
    moveHistory,
    currentPlayer,
    promotionPieceType,
  } = params;

  if (!promotionPieceType) {
    throw new Error('applyPromotionMove: promotionPieceType required');
  }

  const promotionResult = handlePromotionMove(
    board,
    from,
    to,
    promotionPieceType,
    capturedPieces
  );

  const capturedPiece = board[to[0]][to[1]];
  const moveRecord = createMoveRecord(
    board,
    from,
    to,
    capturedPiece,
    promotionPieceType
  );

  const nextPlayer = getNextPlayer(currentPlayer);
  const newGameStatus = getGameStatusAfterMove(
    promotionResult.newBoard,
    currentPlayer
  );

  return {
    newBoard: promotionResult.newBoard,
    newCapturedPieces: promotionResult.newCapturedPieces,
    newEnPassantTarget: null,
    newMoveHistory: [...moveHistory, moveRecord],
    newGameStatus,
    nextPlayer,
    promotionRequired: false,
  };
}

function applyRegularMove(params: ApplyMoveParams): ApplyMoveResult {
  const {
    board,
    from,
    to,
    enPassantTarget,
    capturedPieces,
    moveHistory,
    currentPlayer,
  } = params;

  const moveResult = handleRegularMove(
    board,
    from,
    to,
    enPassantTarget,
    capturedPieces
  );

  if (moveResult.promotionRequired) {
    return {
      newBoard: board,
      newCapturedPieces: capturedPieces,
      newEnPassantTarget: null,
      newMoveHistory: moveHistory,
      newGameStatus: getGameStatusAfterMove(board, currentPlayer),
      nextPlayer: getNextPlayer(currentPlayer),
      promotionRequired: true,
    };
  }

  const moveRecord = createMoveRecord(
    board,
    from,
    to,
    moveResult.capturedPiece
  );
  const nextPlayer = getNextPlayer(currentPlayer);
  const newGameStatus = getGameStatusAfterMove(
    moveResult.newBoard,
    currentPlayer
  );

  return {
    newBoard: moveResult.newBoard,
    newCapturedPieces: moveResult.newCapturedPieces,
    newEnPassantTarget: moveResult.newEnPassantTarget,
    newMoveHistory: [...moveHistory, moveRecord],
    newGameStatus,
    nextPlayer,
    promotionRequired: false,
  };
}

export function applyMove(params: ApplyMoveParams): ApplyMoveResult {
  if (params.promotionPieceType) {
    return applyPromotionMove(params);
  }
  return applyRegularMove(params);
}
