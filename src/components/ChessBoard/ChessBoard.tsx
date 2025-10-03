import React from 'react';

import { useGameStore } from '@/store/useGameStore';
import { Colors, GameStatus } from '@/types/types';
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
    setBoard,
    setCurrentPlayer,
    setSelectedSquare,
    setGameStatus,
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
        currentPlayer
      );

      if (isValid) {
        const newBoard = [...board.map(row => [...row])];
        const selectedPiece = newBoard[selectedRow][selectedCol];

        if (selectedPiece) {
          newBoard[row][col] = { ...selectedPiece, hasMoved: true };
          newBoard[selectedRow][selectedCol] = null;

          setBoard(newBoard);
          setSelectedSquare(null);

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
