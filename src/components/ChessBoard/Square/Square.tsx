import React from 'react';

import ChessPiece from '../ChessPiece/ChessPiece';
import type { ChessPiece as ChessPieceType } from '@/types/types';
import { SquareContainer } from './Square.styles';

interface SquareProps {
  isDark: boolean;
  isSelected?: boolean;
  onClick: () => void;
  piece?: ChessPieceType | null;
}

const Square: React.FC<SquareProps> = ({
  isDark,
  isSelected = false,
  onClick,
  piece,
}) => {
  return (
    <SquareContainer
      $isDark={isDark}
      $isSelected={isSelected}
      onClick={onClick}
    >
      {piece && <ChessPiece type={piece.type} color={piece.color} size={40} />}
    </SquareContainer>
  );
};

export default Square;