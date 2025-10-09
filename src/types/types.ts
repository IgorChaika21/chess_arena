export enum Colors {
  WHITE = 'white',
  BLACK = 'black',
}

export enum FigureNames {
  KING = 'king',
  KNIGHT = 'knight',
  PAWN = 'pawn',
  QUEEN = 'queen',
  ROOK = 'rook',
  BISHOP = 'bishop',
}

export enum GameStatus {
  IN_PROGRESS = 'in-progress',
  CHECK = 'check',
  CHECKMATE = 'checkmate',
  STALEMATE = 'stalemate',
}

export type PromotionPieceType =
  | FigureNames.QUEEN
  | FigureNames.ROOK
  | FigureNames.BISHOP
  | FigureNames.KNIGHT;

export interface ChessPiece {
  color: Colors;
  type: FigureNames;
  hasMoved?: boolean;
}

export interface CapturedPieces {
  white: ChessPiece[];
  black: ChessPiece[];
}

export type Board = (ChessPiece | null)[][];

export type BoardPosition = [number, number];

export interface PromotionMove {
  from: BoardPosition;
  to: BoardPosition;
}
