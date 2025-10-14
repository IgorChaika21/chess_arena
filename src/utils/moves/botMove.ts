import { Colors, FigureNames, GameStatus } from '@/types/types';
import type { Board, BoardPosition, CapturedPieces, Move } from '@/types/types';
import { createMoveRecord } from '@/utils/notation/moveRecord';
import { getGameStatusAfterMove } from '@/utils/rules/gameState';

interface BotMoveResult {
  newBoard: Board;
  newCapturedPieces: CapturedPieces;
  newEnPassantTarget: BoardPosition | null;
  newMoveHistory: Move[];
  newGameStatus: GameStatus;
  nextPlayer: Colors;
}

export const handleBotMove = (
  board: Board,
  from: BoardPosition,
  to: BoardPosition,
  currentPlayer: Colors,
  enPassantTarget: BoardPosition | null,
  capturedPieces: CapturedPieces,
  moveHistory: Move[]
): BotMoveResult => {
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

  const moveRecord = createMoveRecord(board, from, to, targetPiece);
  newMoveHistory.push(moveRecord);

  newBoard[toRow][toCol] = { ...piece, hasMoved: true };
  newBoard[fromRow][fromCol] = null;

  const nextPlayer = currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  const newGameStatus = getGameStatusAfterMove(newBoard, currentPlayer);

  return {
    newBoard,
    newCapturedPieces,
    newEnPassantTarget,
    newMoveHistory,
    newGameStatus,
    nextPlayer,
  };
};
