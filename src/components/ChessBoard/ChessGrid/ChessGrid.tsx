import React from 'react';

import type { Board } from '@/types/types';

import {
  ChessBoardContainer,
  ColumnLabels,
  NotationLabel,
  BoardGrid,
  Row,
  RowLabels,
} from './ChessGrid.styles';

interface ChessGridProps {
  board: Board;
  onSquareClick?: (row: number, col: number) => void;
}

const ChessGrid: React.FC<ChessGridProps> = ({ board, onSquareClick }) => {
  const columnLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const rowLabels = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const renderSquare = (rowIndex: number, colIndex: number) => {
    const isDark = (rowIndex + colIndex) % 2 === 1;
    const piece = board[rowIndex]?.[colIndex];

    return (
      <div
        key={`${rowIndex}-${colIndex}`}
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDark ? '#b58863' : '#f0d9b5',
          cursor: 'pointer',
        }}
        onClick={() => onSquareClick?.(rowIndex, colIndex)}
      >
        {piece && (
          <img
            src={`/chess-pieces/${piece.color}-${piece.type}.svg`}
            alt={`${piece.color} ${piece.type}`}
            style={{ width: '35px', height: '35px' }}
          />
        )}
      </div>
    );
  };

  return (
    <ChessBoardContainer>
      <ColumnLabels>
        <div style={{ width: '25px' }} />
        {columnLabels.map(label => (
          <NotationLabel key={label}>{label}</NotationLabel>
        ))}
      </ColumnLabels>
      <div style={{ display: 'flex' }}>
        <RowLabels>
          {rowLabels.map(label => (
            <NotationLabel key={label}>{label}</NotationLabel>
          ))}
        </RowLabels>
        <BoardGrid>
          {board.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
            </Row>
          ))}
        </BoardGrid>
      </div>
    </ChessBoardContainer>
  );
};

export default ChessGrid;
