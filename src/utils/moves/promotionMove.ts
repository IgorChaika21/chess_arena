import type {
  Board,
  CapturedPieces,
  PromotionPieceType,
  BoardPosition,
} from '@/types/types';
import { FigureNames } from '@/types/types';

export const handlePromotionMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  pieceType: PromotionPieceType,
  capturedPieces: CapturedPieces
): { newBoard: Board; newCapturedPieces: CapturedPieces } => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const newBoard = board.map(row => [...row]);
  const movingPiece = newBoard[fromRow][fromCol];

  if (!movingPiece || movingPiece.type !== FigureNames.PAWN) {
    throw new Error('Invalid promotion move');
  }

  const capturedPiece = newBoard[toRow][toCol];
  const newCapturedPieces = {
    white: [...capturedPieces.white],
    black: [...capturedPieces.black],
  };
  if (capturedPiece) {
    newCapturedPieces[capturedPiece.color].push(capturedPiece);
  }

  newBoard[toRow][toCol] = {
    color: movingPiece.color,
    type: pieceType,
    hasMoved: true,
  };
  newBoard[fromRow][fromCol] = null;

  return { newBoard, newCapturedPieces };
};
