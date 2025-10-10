import React from 'react';

import type { PromotionPieceType } from '@/types/types';
import { FigureNames } from '@/types/types';

import {
  PromotionModalOverlay,
  PromotionOptions,
  PromotionTitle,
  PromotionButton,
} from './PromotionModal.styles';

interface Props {
  isOpen: boolean;
  onPromotionSelect: (pieceType: PromotionPieceType) => void;
}

const PromotionModal: React.FC<Props> = ({ isOpen, onPromotionSelect }) => {
  if (!isOpen) return null;

  const handlePromotion = (pieceType: PromotionPieceType) => {
    onPromotionSelect(pieceType);
  };

  const promotionOptions: PromotionPieceType[] = [
    FigureNames.QUEEN,
    FigureNames.ROOK,
    FigureNames.BISHOP,
    FigureNames.KNIGHT,
  ];

  return (
    <PromotionModalOverlay>
      <PromotionOptions>
        <PromotionTitle>Promote pawn to:</PromotionTitle>
        {promotionOptions.map(pieceType => (
          <PromotionButton
            key={pieceType}
            onClick={() => handlePromotion(pieceType)}
          >
            {pieceType.charAt(0).toUpperCase() + pieceType.slice(1)}
          </PromotionButton>
        ))}
      </PromotionOptions>
    </PromotionModalOverlay>
  );
};

export default PromotionModal;
