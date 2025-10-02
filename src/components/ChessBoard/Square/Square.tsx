import React from 'react';

import type { ChessPiece as ChessPieceType } from '@/types/types';

import ChessPiece from '../ChessPiece/ChessPiece';

import { SquareContainer } from './Square.styles';

interface SquareProps {
  isDark: boolean;
  isSelected?: boolean;
  isMoveOption?: boolean;
  onClick: () => void;
  piece?: ChessPieceType | null;
}

const Square: React.FC<SquareProps> = ({
  isDark,
  isSelected = false,
  isMoveOption = false,
  onClick,
  piece,
}) => {
  return (
    <SquareContainer
      $isDark={isDark}
      $isSelected={isSelected}
      $isMoveOption={isMoveOption}
      onClick={onClick}
    >
      {piece && <ChessPiece type={piece.type} color={piece.color} size={40} />}
    </SquareContainer>
  );
};

export default Square;
