import React from 'react';

import { useGameStore } from '@/store/useGameStore';
import { Colors } from '@/types/types';
import { isValidMove } from '@/utils/moveValidation';

import ChessGrid from './ChessGrid/ChessGrid';

const ChessBoard: React.FC = () => {
  const {
    board,
    currentPlayer,
    selectedSquare,
    setBoard,
    setCurrentPlayer,
    setSelectedSquare,
  } = useGameStore();

  const handleSquareClick = (row: number, col: number) => {
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
          newBoard[row][col] = selectedPiece;
          newBoard[selectedRow][selectedCol] = null;
          setBoard(newBoard);
          setSelectedSquare(null);
          setCurrentPlayer(
            currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE
          );
        }
      } else {
        setSelectedSquare(null);
      }
    }
  };

  return <ChessGrid board={board} onSquareClick={handleSquareClick} />;
};

export default ChessBoard;
