import { useMemo, useCallback } from 'react';

import { useGameStore } from '@/store/useGameStore';
import { Colors, FigureNames, GameStatus } from '@/types/types';
import type { ChessPiece, BoardPosition } from '@/types/types';
import { isKingInCheck } from '@/utils/gameStateHelpers';
import { isCheckmate, isStalemate } from '@/utils/gameStateRules';
import { isValidMove } from '@/utils/moveValidation';

import type { UseBoardState } from './useBoardState';

export function useMoveHandler(boardState: UseBoardState) {
  const {
    board,
    setBoard,
    selectedSquare,
    setSelectedSquare,
    enPassantTarget,
    setEnPassantTarget,
  } = boardState;

  const {
    currentPlayer,
    setCurrentPlayer,
    gameStatus,
    setGameStatus,
    gameStarted,
  } = useGameStore();

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
            currentPlayer,
            enPassantTarget
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
      if (!gameStarted) {
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
            currentPlayer,
            enPassantTarget
          )
        ) {
          const newBoard = [...board.map(row => [...row])];
          let newEnPassantTarget: BoardPosition | null = null;

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
            newBoard[capturedPawnRow][capturedPawnCol] = null;
          }

          if (
            selectedPiece.type === FigureNames.PAWN &&
            Math.abs(row - sr) === 2
          ) {
            newEnPassantTarget = [sr + (row - sr) / 2, col];
          } else {
            newEnPassantTarget = null;
          }

          newBoard[row][col] = { ...selectedPiece, hasMoved: true };
          newBoard[sr][sc] = null;

          setBoard(newBoard);
          setSelectedSquare(null);
          setEnPassantTarget(newEnPassantTarget);

          const nextPlayer =
            currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
          setCurrentPlayer(nextPlayer);

          let newGameStatus = GameStatus.IN_PROGRESS;

          if (isCheckmate(newBoard, nextPlayer)) {
            newGameStatus = GameStatus.CHECKMATE;
          } else if (isStalemate(newBoard, nextPlayer)) {
            newGameStatus = GameStatus.STALEMATE;
          } else if (isKingInCheck(newBoard, nextPlayer)) {
            newGameStatus = GameStatus.CHECK;
          }

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
      isSameSquare,
      canSelectPiece,
      setBoard,
      setSelectedSquare,
      setEnPassantTarget,
      setCurrentPlayer,
      setGameStatus,
    ]
  );

  return {
    handleSquareClick,
    possibleMoves,
  };
}
