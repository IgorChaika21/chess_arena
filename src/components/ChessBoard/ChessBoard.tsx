import React from 'react';

import { useGameStore } from '@/store/useGameStore';
import {
  Colors,
  GameStatus,
  FigureNames,
  type BoardPosition,
} from '@/types/types';
import { isKingInCheck } from '@/utils/gameStateHelpers';
import { isCheckmate, isStalemate } from '@/utils/gameStateRules';
import { isValidMove } from '@/utils/moveValidation';

import ChessGrid from './ChessGrid/ChessGrid';

const ChessBoard: React.FC = () => {
  const {
    board,
    currentPlayer,
    selectedSquare,
    gameStatus,
    enPassantTarget,
    setBoard,
    setCurrentPlayer,
    setSelectedSquare,
    setGameStatus,
    setEnPassantTarget,
  } = useGameStore();

  const handleSquareClick = (row: number, col: number) => {
    if (
      gameStatus === GameStatus.CHECKMATE ||
      gameStatus === GameStatus.STALEMATE
    ) {
      return;
    }

    const piece = board[row][col];

    if (!selectedSquare && piece && piece.color === currentPlayer) {
      setSelectedSquare([row, col]);
      return;
    }

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;

      if (selectedRow === row && selectedCol === col) {
        setSelectedSquare(null);
        return;
      }

      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
        return;
      }

      const isValid = isValidMove(
        board,
        [selectedRow, selectedCol],
        [row, col],
        currentPlayer,
        enPassantTarget
      );

      if (isValid) {
        const newBoard = [...board.map(row => [...row])];
        const selectedPiece = newBoard[selectedRow][selectedCol];
        let newEnPassantTarget: BoardPosition | null = null;

        if (selectedPiece) {
          if (
            selectedPiece.type === FigureNames.KING &&
            Math.abs(col - selectedCol) === 2
          ) {
            const isKingside = col > selectedCol;
            const rookCol = isKingside ? 7 : 0;
            const newRookCol = isKingside ? 5 : 3;
            const rook = newBoard[selectedRow][rookCol];

            if (rook) {
              newBoard[selectedRow][newRookCol] = { ...rook, hasMoved: true };
              newBoard[selectedRow][rookCol] = null;
            }
          }

          if (
            selectedPiece.type === FigureNames.PAWN &&
            enPassantTarget &&
            row === enPassantTarget[0] &&
            col === enPassantTarget[1] &&
            selectedCol !== col
          ) {
            const capturedPawnRow = selectedRow;
            const capturedPawnCol = col;
            newBoard[capturedPawnRow][capturedPawnCol] = null;
          }

          if (
            selectedPiece.type === FigureNames.PAWN &&
            Math.abs(row - selectedRow) === 2
          ) {
            newEnPassantTarget = [selectedRow + (row - selectedRow) / 2, col];
          } else {
            newEnPassantTarget = null;
          }

          newBoard[row][col] = { ...selectedPiece, hasMoved: true };
          newBoard[selectedRow][selectedCol] = null;

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
        }
      } else {
        setSelectedSquare(null);
      }
    }
  };

  return <ChessGrid board={board} onSquareClick={handleSquareClick} />;
};

export default ChessBoard;
