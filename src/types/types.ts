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

export enum GameMode {
  PVP = 'pvp',
  PVB = 'pvb',
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

export interface Move {
  from: BoardPosition;
  to: BoardPosition;
  piece: ChessPiece;
  capturedPiece: ChessPiece | null;
  promotion?: PromotionPieceType;
  notation: string;
}

export type MoveHistory = Move[];

export interface ApplyMoveParams {
  board: Board;
  from: BoardPosition;
  to: BoardPosition;
  currentPlayer: Colors;
  enPassantTarget: BoardPosition | null;
  capturedPieces: CapturedPieces;
  moveHistory: MoveHistory;
  promotionPieceType?: PromotionPieceType;
}

export interface ApplyMoveResult {
  newBoard: Board;
  newCapturedPieces: CapturedPieces;
  newEnPassantTarget: BoardPosition | null;
  newMoveHistory: MoveHistory;
  newGameStatus: GameStatus;
  nextPlayer: Colors;
  promotionRequired: boolean;
}

export interface MoveResult {
  newBoard: Board;
  capturedPiece: ChessPiece | null;
  newEnPassantTarget: BoardPosition | null;
  newCapturedPieces: CapturedPieces;
  promotionRequired: boolean;
}

export interface BotMoveResult {
  newBoard: Board;
  newCapturedPieces: CapturedPieces;
  newEnPassantTarget: BoardPosition | null;
  newMoveHistory: MoveHistory;
  newGameStatus: GameStatus;
  nextPlayer: Colors;
}
