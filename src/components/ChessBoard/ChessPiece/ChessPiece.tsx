import React from 'react';

import { Colors, FigureNames } from '@/types/types';

import { ChessPieceImage } from './ChessPiece.styles';

interface ChessPieceProps {
  type: FigureNames;
  color: Colors;
  size?: number;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ type, color, size = 45 }) => {
  const getPieceImage = () => {
    return `/chess-pieces/${color}-${type}.svg`;
  };

  return (
    <ChessPieceImage
      src={getPieceImage()}
      alt={`${color} ${type}`}
      $size={size}
    />
  );
};

export default ChessPiece;
