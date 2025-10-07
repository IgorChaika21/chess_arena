import React from 'react';

import ChessPiece from '@/components/ChessBoard/ChessPiece/ChessPiece';
import type { ChessPiece as ChessPieceType } from '@/types/types';

import { SquareContainer } from './Square.styles';

interface SquareProps {
  isDark: boolean;
  isSelected: boolean;
  isMoveOption?: boolean;
  onClick: () => void;
  piece?: ChessPieceType | null;
}

const Square: React.FC<SquareProps> = ({
  isDark,
  isSelected,
  onClick,
  piece,
  isMoveOption = false,
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
