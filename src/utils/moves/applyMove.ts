import { Colors, FigureNames, GameStatus } from '@/types/types';
import type {
  Board,
  BoardPosition,
  CapturedPieces,
  Move,
  PromotionPieceType,
} from '@/types/types';
import { createMoveRecord } from '@/utils/notation/moveRecord';
import { isKingInCheck } from '@/utils/rules/gameStateHelpers';
import { isCheckmate, isStalemate } from '@/utils/rules/gameStateRules';

export interface MoveApplicationResult {
  newBoard: Board;
  newCapturedPieces: CapturedPieces;
  newEnPassantTarget: BoardPosition | null;
  newMoveHistory: Move[];
  newGameStatus: GameStatus;
  nextPlayer: Colors;
}

export const applyMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  currentPlayer: Colors,
  enPassantTarget: BoardPosition | null,
  capturedPieces: CapturedPieces,
  moveHistory: Move[],
  promotion?: PromotionPieceType
): MoveApplicationResult => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  const newBoard = board.map(row => [...row]);
  let newEnPassantTarget: BoardPosition | null = null;
  const newCapturedPieces = { ...capturedPieces };
  const newMoveHistory = [...moveHistory];

  const piece = newBoard[fromRow][fromCol];
  const targetPiece = newBoard[toRow][toCol];

  if (!piece) {
    throw new Error('No piece at from position');
  }

  if (targetPiece) {
    newCapturedPieces[targetPiece.color].push(targetPiece);
  }

  if (piece.type === FigureNames.KING && Math.abs(toCol - fromCol) === 2) {
    const isKingside = toCol > fromCol;
    const rookCol = isKingside ? 7 : 0;
    const newRookCol = isKingside ? 5 : 3;
    const rook = newBoard[fromRow][rookCol];

    if (rook) {
      newBoard[fromRow][newRookCol] = { ...rook, hasMoved: true };
      newBoard[fromRow][rookCol] = null;
    }
  }

  if (
    piece.type === FigureNames.PAWN &&
    enPassantTarget &&
    toRow === enPassantTarget[0] &&
    toCol === enPassantTarget[1] &&
    fromCol !== toCol
  ) {
    const capturedPawnRow = fromRow;
    const capturedPawnCol = toCol;
    const capturedPawn = newBoard[capturedPawnRow][capturedPawnCol];

    if (capturedPawn) {
      newCapturedPieces[capturedPawn.color].push(capturedPawn);
      newBoard[capturedPawnRow][capturedPawnCol] = null;
    }
  }

  if (piece.type === FigureNames.PAWN && Math.abs(toRow - fromRow) === 2) {
    newEnPassantTarget = [fromRow + (toRow - fromRow) / 2, toCol];
  }

  const promotedPiece = promotion
    ? { type: promotion, color: piece.color }
    : piece;

  const moveRecord = createMoveRecord(board, from, to, targetPiece, promotion);
  newMoveHistory.push(moveRecord);

  newBoard[toRow][toCol] = { ...promotedPiece, hasMoved: true };
  newBoard[fromRow][fromCol] = null;

  const nextPlayer =
    currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  let newGameStatus = GameStatus.IN_PROGRESS;

  if (isCheckmate(newBoard, nextPlayer)) {
    newGameStatus = GameStatus.CHECKMATE;
  } else if (isStalemate(newBoard, nextPlayer)) {
    newGameStatus = GameStatus.STALEMATE;
  } else if (isKingInCheck(newBoard, nextPlayer)) {
    newGameStatus = GameStatus.CHECK;
  }

  return {
    newBoard,
    newCapturedPieces,
    newEnPassantTarget,
    newMoveHistory,
    newGameStatus,
    nextPlayer,
  };
};
