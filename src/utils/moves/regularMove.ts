import type {
  Board,
  ChessPiece,
  CapturedPieces,
  MoveResult,
  BoardPosition,
} from '@/types/types';
import { Colors, FigureNames } from '@/types/types';

export const handleRegularMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  enPassantTarget: BoardPosition | null,
  capturedPieces: CapturedPieces
): MoveResult => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const newBoard = board.map(row =>
    row.map(cell => (cell ? { ...cell } : null))
  );
  const piece = newBoard[fromRow][fromCol];

  if (!piece) {
    throw new Error('No piece at selected square');
  }

  const newPiece = { ...piece, hasMoved: true };

  if (
    piece.type === FigureNames.PAWN &&
    ((piece.color === Colors.WHITE && toRow === 0) ||
      (piece.color === Colors.BLACK && toRow === 7))
  ) {
    return buildPromotionResult(newBoard, capturedPieces);
  }

  if (
    piece.type === FigureNames.PAWN &&
    enPassantTarget &&
    toRow === enPassantTarget[0] &&
    toCol === enPassantTarget[1]
  ) {
    return buildEnPassantResult(newBoard, from, to, piece, capturedPieces);
  }

  if (piece.type === FigureNames.KING && Math.abs(toCol - fromCol) === 2) {
    return buildCastlingResult(newBoard, from, to, piece, capturedPieces);
  }

  return buildDefaultMoveResult(newBoard, from, to, newPiece, capturedPieces);
};

function buildPromotionResult(
  newBoard: Board,
  capturedPieces: CapturedPieces
): MoveResult {
  return {
    newBoard,
    capturedPiece: null,
    newEnPassantTarget: null,
    newCapturedPieces: capturedPieces,
    promotionRequired: true,
  };
}

function buildEnPassantResult(
  newBoard: Board,
  from: BoardPosition,
  to: BoardPosition,
  piece: ChessPiece,
  capturedPieces: CapturedPieces
): MoveResult {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  const capturedPiece = newBoard[fromRow][toCol];
  const newCapturedPieces = {
    white: [...capturedPieces.white],
    black: [...capturedPieces.black],
  };
  if (capturedPiece) {
    newCapturedPieces[capturedPiece.color].push(capturedPiece);
    newBoard[fromRow][toCol] = null;
  }

  newBoard[toRow][toCol] = { ...piece, hasMoved: true };
  newBoard[fromRow][fromCol] = null;

  return {
    newBoard,
    capturedPiece,
    newEnPassantTarget: null,
    newCapturedPieces,
    promotionRequired: false,
  };
}

function buildCastlingResult(
  newBoard: Board,
  from: BoardPosition,
  to: BoardPosition,
  piece: ChessPiece,
  capturedPieces: CapturedPieces
): MoveResult {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  const isKingside = toCol > fromCol;
  const rookCol = isKingside ? 7 : 0;
  const newRookCol = isKingside ? 5 : 3;

  const rook = newBoard[fromRow][rookCol];
  if (rook) {
    newBoard[fromRow][newRookCol] = { ...rook, hasMoved: true };
    newBoard[fromRow][rookCol] = null;
  }

  newBoard[toRow][toCol] = { ...piece, hasMoved: true };
  newBoard[fromRow][fromCol] = null;

  return {
    newBoard,
    capturedPiece: null,
    newEnPassantTarget: null,
    newCapturedPieces: capturedPieces,
    promotionRequired: false,
  };
}

function buildDefaultMoveResult(
  newBoard: Board,
  from: BoardPosition,
  to: BoardPosition,
  piece: ChessPiece,
  capturedPieces: CapturedPieces
): MoveResult {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  const capturedPiece = newBoard[toRow][toCol];
  const newCapturedPieces = {
    white: [...capturedPieces.white],
    black: [...capturedPieces.black],
  };
  if (capturedPiece) {
    newCapturedPieces[capturedPiece.color].push(capturedPiece);
  }

  let newEnPassantTarget: BoardPosition | null = null;
  if (piece.type === FigureNames.PAWN && Math.abs(toRow - fromRow) === 2) {
    newEnPassantTarget = [fromRow + (toRow - fromRow) / 2, toCol];
  }

  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;

  return {
    newBoard,
    capturedPiece,
    newEnPassantTarget,
    newCapturedPieces,
    promotionRequired: false,
  };
}
