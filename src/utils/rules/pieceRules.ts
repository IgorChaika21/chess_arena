import type { Board, BoardPosition } from '@/types/types';
import { Colors, FigureNames } from '@/types/types';

import { doesMovePutKingInCheck, isKingInCheck } from './gameStateHelpers';

export const isValidPawnMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  enPassantTarget: BoardPosition | null,
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
    if (
      fromRow === startRow &&
      rowDiff === 2 * direction &&
      !board[fromRow + direction][fromCol] &&
      !targetPiece
    ) {
      return true;
    }
  } else if (colDiff === 1 && rowDiff === direction) {
    if (targetPiece) return true;
    if (
      enPassantTarget &&
      toRow === enPassantTarget[0] &&
      toCol === enPassantTarget[1]
    ) {
      return true;
    }
  }
  return false;
};

export const isValidRookMove = (
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

export const isValidKnightMove = (
  from: BoardPosition,
  to: BoardPosition
): boolean => {
  const rowDiff = Math.abs(to[0] - from[0]);
  const colDiff = Math.abs(to[1] - from[1]);
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

export const isValidBishopMove = (
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
  let row = fromRow + rowStep;
  let col = fromCol + colStep;
  while (row !== toRow && col !== toCol) {
    if (board[row][col]) return false;
    row += rowStep;
    col += colStep;
  }
  return true;
};

export const isValidQueenMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (fromRow === toRow || fromCol === toCol) {
    return isValidRookMove(board, from, to);
  } else if (rowDiff === colDiff) {
    return isValidBishopMove(board, from, to);
  }
  return false;
};

export const isValidKingMove = (
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
    const isKingside = toCol > fromCol;
    const rookCol = isKingside ? 7 : 0;
    const rook = board[fromRow][rookCol];

    if (rook && rook.type === FigureNames.ROOK && !rook.hasMoved) {
      if (isKingInCheck(board, currentPlayer)) return false;

      const pathStart = Math.min(fromCol, rookCol) + 1;
      const pathEnd = Math.max(fromCol, rookCol);
      for (let col = pathStart; col < pathEnd; col++) {
        if (board[fromRow][col]) return false;
        if (
          doesMovePutKingInCheck(board, from, [fromRow, col], currentPlayer)
        ) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
};
