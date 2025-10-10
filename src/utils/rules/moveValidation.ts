import type { Board, BoardPosition } from '@/types/types';
import { Colors, FigureNames } from '@/types/types';

import { doesMovePutKingInCheck, isKingInCheck } from './gameStateHelpers';

export const isValidMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  currentPlayer: Colors,
  enPassantTarget: BoardPosition | null = null
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
      if (!isValidPawnMove(board, from, to, piece.color, enPassantTarget))
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

  return !doesMovePutKingInCheck(board, from, to, currentPlayer);
};

const isValidPawnMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  color: Colors,
  enPassantTarget: BoardPosition | null = null
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const targetPiece = board[toRow][toCol];
  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);

  const direction = color === Colors.WHITE ? -1 : 1;
  const startRow = color === Colors.WHITE ? 6 : 1;

  if (fromCol === toCol) {
    if (rowDiff === direction && !targetPiece) return true;
    if (fromRow === startRow && rowDiff === 2 * direction && !targetPiece) {
      return !board[fromRow + direction][fromCol];
    }
  } else if (colDiff === 1 && rowDiff === direction) {
    if (targetPiece) return true;

    if (enPassantTarget) {
      const [targetRow, targetCol] = enPassantTarget;

      if (toRow === targetRow && toCol === targetCol) {
        const capturedPawnRow = fromRow;
        const capturedPawnCol = toCol;
        const capturedPawn = board[capturedPawnRow][capturedPawnCol];

        return (
          !!capturedPawn &&
          capturedPawn.type === FigureNames.PAWN &&
          capturedPawn.color !== color
        );
      }
    }
  }

  return false;
};

const isValidKnightMove = (from: BoardPosition, to: BoardPosition): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

const isValidBishopMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff !== colDiff) return false;

  const rowStep = toRow > fromRow ? 1 : -1;
  const colStep = toCol > fromCol ? 1 : -1;

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow && currentCol !== toCol) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
};

const isValidRookMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  if (fromRow !== toRow && fromCol !== toCol) return false;

  if (fromRow === toRow) {
    const start = Math.min(fromCol, toCol) + 1;
    const end = Math.max(fromCol, toCol);
    for (let col = start; col < end; col++) {
      if (board[fromRow][col]) return false;
    }
  } else {
    const start = Math.min(fromRow, toRow) + 1;
    const end = Math.max(fromRow, toRow);
    for (let row = start; row < end; row++) {
      if (board[row][fromCol]) return false;
    }
  }

  return true;
};

const isValidQueenMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition
): boolean => {
  return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
};

const isValidKingMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  hasMoved: boolean,
  currentPlayer: Colors
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff <= 1 && colDiff <= 1) return true;

  if (rowDiff === 0 && colDiff === 2 && !hasMoved) {
    return isValidCastlingMove(board, from, to, currentPlayer);
  }

  return false;
};

const isValidCastlingMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  currentPlayer: Colors
): boolean => {
  const [fromRow, fromCol] = from;
  const [, toCol] = to;
  const isKingside = toCol > fromCol;
  const rookCol = isKingside ? 7 : 0;
  const rook = board[fromRow][rookCol];

  if (!rook || rook.type !== FigureNames.ROOK || rook.hasMoved) {
    return false;
  }
  const pathStart = Math.min(fromCol, rookCol) + 1;
  const pathEnd = Math.max(fromCol, rookCol);

  for (let col = pathStart; col < pathEnd; col++) {
    if (board[fromRow][col]) return false;
  }

  if (isKingInCheck(board, currentPlayer)) return false;

  const kingStep = isKingside ? 1 : -1;
  for (let col = fromCol; col !== toCol; col += kingStep) {
    const tempBoard = [...board.map(row => [...row])];
    tempBoard[fromRow][col] = { type: FigureNames.KING, color: currentPlayer };
    tempBoard[fromRow][fromCol] = null;

    if (isKingInCheck(tempBoard, currentPlayer)) {
      return false;
    }
  }

  return true;
};
