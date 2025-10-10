import React, { useMemo, useCallback } from 'react';

import { columnLabels, rowLabels } from '@/constants/constants';
import type { Board, BoardPosition } from '@/types/types';

import Square from '../Square/Square';

import {
  ChessBoardAndRowLabels,
  BoardGrid,
  Row,
  ColumnLabels,
  RowLabels,
  NotationLabel,
  NotationColumnLabel,
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
  size = 8,
}) => {
  const rows = useMemo(() => Array(size).fill(null), [size]);
  const cols = useMemo(() => Array(size).fill(null), [size]);

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

  const renderSquareRow = useCallback(
    (rowIndex: number) => (
      <Row key={rowIndex}>
        {cols.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
      </Row>
    ),
    [cols, renderSquare]
  );

  const renderColumnLabels = useCallback(
    () =>
      cols.map((_, colIndex) => (
        <NotationColumnLabel key={`col-${colIndex}`}>
          {columnLabels[colIndex]}
        </NotationColumnLabel>
      )),
    [cols]
  );

  const renderRowLabels = useCallback(
    () =>
      rows.map((_, rowIndex) => (
        <NotationLabel key={`row-${rowIndex}`}>
          {rowLabels[rowIndex]}
        </NotationLabel>
      )),
    [rows]
  );

  const renderBoard = useCallback(
    () => rows.map((_, rowIndex) => renderSquareRow(rowIndex)),
    [rows, renderSquareRow]
  );

  return (
    <>
      <ColumnLabels>{renderColumnLabels()}</ColumnLabels>
      <ChessBoardAndRowLabels>
        <RowLabels>{renderRowLabels()}</RowLabels>
        <BoardGrid>{renderBoard()}</BoardGrid>
      </ChessBoardAndRowLabels>
    </>
  );
};

export default ChessGrid;
