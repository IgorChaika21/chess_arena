import React from 'react';

import { columnLabels, rowLabels } from '@/constants/constants';
import { useGameStore } from '@/store/useGameStore';
import type { Board } from '@/types/types';

import Square from '../Square/Square';

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
  const { selectedSquare } = useGameStore();

  const renderSquare = (rowIndex: number, colIndex: number) => {
    const isDark = (rowIndex + colIndex) % 2 === 1;
    const piece = board[rowIndex]?.[colIndex];
    const isSelected =
      selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex;

    return (
      <Square
        key={`${rowIndex}-${colIndex}`}
        isDark={isDark}
        isSelected={isSelected}
        piece={piece}
        onClick={() => onSquareClick?.(rowIndex, colIndex)}
      />
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
