import { columnLabels, rowLabels } from '@/constants/constants';
import { FigureNames } from '@/types/types';
import type {
  Board,
  ChessPiece,
  PromotionPieceType,
  BoardPosition,
} from '@/types/types';

export const getSquareNotation = (row: number, col: number): string => {
  return `${columnLabels[col]}${rowLabels[row]}`;
};

export const getPieceNotation = (piece: ChessPiece): string => {
  switch (piece.type) {
    case FigureNames.KING:
      return 'K';
    case FigureNames.QUEEN:
      return 'Q';
    case FigureNames.ROOK:
      return 'R';
    case FigureNames.BISHOP:
      return 'B';
    case FigureNames.KNIGHT:
      return 'N';
    default:
      return '';
  }
};

export const getMoveNotation = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  capturedPiece: ChessPiece | null,
  promotion?: PromotionPieceType
): string => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const piece = board[fromRow][fromCol];

  if (!piece) return '';

  let notation = '';

  if (piece.type === FigureNames.KING && Math.abs(fromCol - toCol) === 2) {
    return toCol > fromCol ? 'O-O' : 'O-O-O';
  }

  if (piece.type !== FigureNames.PAWN) {
    notation += getPieceNotation(piece);
  }

  notation += getSquareNotation(fromRow, fromCol);

  if (capturedPiece) {
    notation += 'x';
  } else {
    notation += '-';
  }

  notation += getSquareNotation(toRow, toCol);

  if (promotion) {
    notation += `=${getPieceNotation({ type: promotion } as ChessPiece)}`;
  }

  return notation;
};
