import type { Board, BoardPosition } from '@/types/types';
import { Colors, FigureNames } from '@/types/types';

export const isValidMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  currentPlayer: Colors
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];

  if (!piece) return false;
  if (piece.color !== currentPlayer) return false;
  if (targetPiece && targetPiece.color === piece.color) return false;
  if (fromRow === toRow && fromCol === toCol) return false;

  switch (piece.type) {
    case FigureNames.PAWN:
      return isValidPawnMove(board, from, to, piece.color);
    case FigureNames.KNIGHT:
      return isValidKnightMove(from, to);
    case FigureNames.BISHOP:
      return isValidBishopMove(board, from, to);
    case FigureNames.ROOK:
      return isValidRookMove(board, from, to);
    case FigureNames.QUEEN:
      return isValidQueenMove(board, from, to);
    case FigureNames.KING:
      return isValidKingMove(from, to);
    default:
      return false;
  }
};

const isValidPawnMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  color: Colors
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
    return !!targetPiece;
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

const isValidKingMove = (from: BoardPosition, to: BoardPosition): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  return rowDiff <= 1 && colDiff <= 1;
};
