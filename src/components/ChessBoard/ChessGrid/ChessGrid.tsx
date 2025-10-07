import React, { useCallback } from 'react';

import { columnLabels, rowLabels } from '@/constants/constants';
import type { Board, BoardPosition } from '@/types/types';

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
  selectedSquare: BoardPosition | null;
  possibleMoves?: BoardPosition[];
  handleSquareClick: (row: number, col: number) => void;
  size?: number;
}

const ChessGrid: React.FC<ChessGridProps> = ({
  board,
  selectedSquare,
  possibleMoves = [],
  handleSquareClick,
}) => {
  const isSquareSelected = useCallback(
    (rowIndex: number, colIndex: number): boolean => {
      return (
        selectedSquare !== null &&
        selectedSquare[0] === rowIndex &&
        selectedSquare[1] === colIndex
      );
    },
    [selectedSquare]
  );

  const isMoveOption = useCallback(
    (rowIndex: number, colIndex: number): boolean => {
      return possibleMoves.some(([r, c]) => r === rowIndex && c === colIndex);
    },
    [possibleMoves]
  );

  const renderSquare = useCallback(
    (rowIndex: number, colIndex: number) => {
      const isDark = (rowIndex + colIndex) % 2 === 1;
      const piece = board[rowIndex][colIndex];

      return (
        <Square
          key={`${rowIndex}-${colIndex}`}
          isDark={isDark}
          isSelected={isSquareSelected(rowIndex, colIndex)}
          isMoveOption={isMoveOption(rowIndex, colIndex)}
          onClick={() => handleSquareClick(rowIndex, colIndex)}
          piece={piece}
        />
      );
    },
    [board, isSquareSelected, isMoveOption, handleSquareClick]
  );

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
