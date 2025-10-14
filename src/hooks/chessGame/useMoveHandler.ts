import { useMemo, useCallback } from 'react';

import { useGameStore } from '@/store/useGameStore';
import { Colors, FigureNames, GameStatus, GameMode } from '@/types/types';
import type {
  ChessPiece,
  BoardPosition,
  PromotionPieceType,
} from '@/types/types';
import { createMoveRecord } from '@/utils/notation/moveRecord';
import { getGameStatusAfterMove } from '@/utils/rules/gameState';
import { isValidMove } from '@/utils/rules/moveValidation';

import type { UseBoardState } from './useBoardState';

export function useMoveHandler(boardState: UseBoardState) {
  const {
    board,
    setBoard,
    selectedSquare,
    setSelectedSquare,
    enPassantTarget,
    setEnPassantTarget,
    promotionMove,
    setPromotionMove,
  } = boardState;

  const {
    currentPlayer,
    setCurrentPlayer,
    gameStatus,
    setGameStatus,
    gameStarted,
    capturedPieces,
    setCapturedPieces,
    moveHistory,
    setMoveHistory,
    playerColor,
    gameMode,
  } = useGameStore();

  const handlePromotion = useCallback(
    (pieceType: PromotionPieceType) => {
      if (!promotionMove) return;

      const { from, to } = promotionMove;
      const [fromRow, fromCol] = from;
      const [toRow, toCol] = to;

      const newBoard = board.map(row => [...row]);
      const piece = newBoard[fromRow][fromCol];
      const newMoveHistory = [...moveHistory];

      const capturedPiece = board[toRow][toCol];

      if (piece && piece.type === FigureNames.PAWN) {
        const moveRecord = createMoveRecord(
          board,
          from,
          to,
          capturedPiece,
          pieceType
        );
        newMoveHistory.push(moveRecord);

        newBoard[toRow][toCol] = {
          color: piece.color,
          type: pieceType,
          hasMoved: true,
        };
        newBoard[fromRow][fromCol] = null;

        setBoard(newBoard);
        setMoveHistory(newMoveHistory);
        setPromotionMove(null);
        setSelectedSquare(null);

        const nextPlayer =
          currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
        setCurrentPlayer(nextPlayer);

        const newGameStatus = getGameStatusAfterMove(newBoard, currentPlayer);
        setGameStatus(newGameStatus);
      }
    },
    [
      promotionMove,
      board,
      currentPlayer,
      moveHistory,
      setBoard,
      setMoveHistory,
      setPromotionMove,
      setSelectedSquare,
      setCurrentPlayer,
      setGameStatus,
    ]
  );

  const canSelectPiece = useCallback(
    (piece: ChessPiece | null): boolean => {
      return !!(piece && piece.color === currentPlayer);
    },
    [currentPlayer]
  );

  const isSameSquare = useCallback(
    (square1: BoardPosition | null, square2: BoardPosition): boolean => {
      return square1?.[0] === square2[0] && square1?.[1] === square2[1];
    },
    []
  );

  const possibleMoves = useMemo<BoardPosition[]>(() => {
    if (!selectedSquare) return [];

    const moves: BoardPosition[] = [];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (
          isValidMove(
            board,
            selectedSquare,
            [r, c],
            enPassantTarget,
            currentPlayer
          )
        ) {
          moves.push([r, c]);
        }
      }
    }

    return moves;
  }, [selectedSquare, board, enPassantTarget, currentPlayer]);

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (gameMode === GameMode.PVB && currentPlayer !== playerColor) {
        return;
      }

      if (!gameStarted || promotionMove) {
        return;
      }

      if (
        gameStatus === GameStatus.CHECKMATE ||
        gameStatus === GameStatus.STALEMATE
      ) {
        return;
      }

      const clickedSquare: BoardPosition = [row, col];
      const piece = board[row][col];

      if (isSameSquare(selectedSquare, clickedSquare)) {
        setSelectedSquare(null);
        return;
      }

      if (canSelectPiece(piece)) {
        setSelectedSquare(clickedSquare);
        return;
      }

      if (selectedSquare) {
        const [sr, sc] = selectedSquare;
        const selectedPiece = board[sr][sc];

        if (!selectedPiece) {
          setSelectedSquare(null);
          return;
        }

        if (
          isValidMove(
            board,
            [sr, sc],
            clickedSquare,
            enPassantTarget,
            currentPlayer
          )
        ) {
          const newBoard = [...board.map(row => [...row])];
          let newEnPassantTarget: BoardPosition | null = null;
          const newCapturedPieces = { ...capturedPieces };
          const newMoveHistory = [...moveHistory];

          const targetPiece = newBoard[row][col];
          if (targetPiece) {
            newCapturedPieces[targetPiece.color].push(targetPiece);
          }

          if (
            selectedPiece.type === FigureNames.PAWN &&
            ((selectedPiece.color === Colors.WHITE && row === 0) ||
              (selectedPiece.color === Colors.BLACK && row === 7))
          ) {
            setPromotionMove({ from: [sr, sc], to: [row, col] });
            setCapturedPieces(newCapturedPieces);
            return;
          }

          if (
            selectedPiece.type === FigureNames.KING &&
            Math.abs(col - sc) === 2
          ) {
            const isKingside = col > sc;
            const rookCol = isKingside ? 7 : 0;
            const newRookCol = isKingside ? 5 : 3;
            const rook = newBoard[sr][rookCol];

            if (rook) {
              newBoard[sr][newRookCol] = { ...rook, hasMoved: true };
              newBoard[sr][rookCol] = null;
            }
          }

          if (
            selectedPiece.type === FigureNames.PAWN &&
            enPassantTarget &&
            row === enPassantTarget[0] &&
            col === enPassantTarget[1] &&
            sc !== col
          ) {
            const capturedPawnRow = sr;
            const capturedPawnCol = col;
            const capturedPawn = newBoard[capturedPawnRow][capturedPawnCol];
            if (capturedPawn) {
              newCapturedPieces[capturedPawn.color].push(capturedPawn);
              newBoard[capturedPawnRow][capturedPawnCol] = null;
            }
          }

          if (
            selectedPiece.type === FigureNames.PAWN &&
            Math.abs(row - sr) === 2
          ) {
            newEnPassantTarget = [sr + (row - sr) / 2, col];
          } else {
            newEnPassantTarget = null;
          }

          const moveRecord = createMoveRecord(
            board,
            [sr, sc],
            [row, col],
            targetPiece
          );
          newMoveHistory.push(moveRecord);

          newBoard[row][col] = { ...selectedPiece, hasMoved: true };
          newBoard[sr][sc] = null;

          setBoard(newBoard);
          setCapturedPieces(newCapturedPieces);
          setMoveHistory(newMoveHistory);
          setSelectedSquare(null);
          setEnPassantTarget(newEnPassantTarget);

          const nextPlayer =
            currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
          setCurrentPlayer(nextPlayer);

          const newGameStatus = getGameStatusAfterMove(newBoard, currentPlayer);
          setGameStatus(newGameStatus);
        } else {
          setSelectedSquare(null);
        }
      }
    },
    [
      board,
      selectedSquare,
      enPassantTarget,
      currentPlayer,
      gameStatus,
      gameStarted,
      promotionMove,
      capturedPieces,
      moveHistory,
      isSameSquare,
      canSelectPiece,
      gameMode,
      playerColor,
      setBoard,
      setSelectedSquare,
      setEnPassantTarget,
      setCurrentPlayer,
      setGameStatus,
      setPromotionMove,
      setCapturedPieces,
      setMoveHistory,
    ]
  );

  return {
    handleSquareClick,
    handlePromotion,
    possibleMoves,
  };
}

export type UseMoveHandler = ReturnType<typeof useMoveHandler>;
