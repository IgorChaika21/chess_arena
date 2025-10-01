import React, { useState } from 'react';

import ChessGrid from './ChessGrid/ChessGrid';
import { Colors } from '@/types/types';
import type { Board } from '@/types/types';

const createInitialBoard = (): Board => {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: Colors.BLACK };
    board[6][i] = { type: 'pawn', color: Colors.WHITE };
  }
  
  const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  pieces.forEach((piece, i) => {
    board[0][i] = { type: piece, color: Colors.BLACK };
    board[7][i] = { type: piece, color: Colors.WHITE };
  });
  
  return board;
};

const ChessBoard: React.FC = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Colors>(Colors.WHITE);

  const handleSquareClick = (row: number, col: number) => {
    const piece = board[row][col];

    if (!selectedSquare && piece && piece.color === currentPlayer) {
      setSelectedSquare([row, col]);
      return;
    }

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = board[selectedRow][selectedCol];

      if (selectedRow === row && selectedCol === col) {
        setSelectedSquare(null);
        return;
      }

      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
        return;
      }

      const isValidMove = true; // Replace with actual move validation logic

      if (isValidMove && selectedPiece) {
        // Make a move
        const newBoard = [...board.map(row => [...row])];
        newBoard[row][col] = selectedPiece;
        newBoard[selectedRow][selectedCol] = null;
        setBoard(newBoard);
        setSelectedSquare(null);
        setCurrentPlayer(currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
      }
    }
  };

  return (
    <div>
      <ChessGrid board={board} onSquareClick={handleSquareClick} />
    </div>
  );
};

export default ChessBoard;