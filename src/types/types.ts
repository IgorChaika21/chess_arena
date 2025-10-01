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

export interface ChessPiece {
  color: Colors;
  type: FigureNames;
  hasMoved?: boolean;
}

export type Board = (ChessPiece | null)[][];
