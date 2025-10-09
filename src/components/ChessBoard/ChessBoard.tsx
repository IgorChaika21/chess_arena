import React from 'react';
import styled from 'styled-components';

import useChessGame from '@/hooks/chessGame/useChessGame';
import { media } from '@/styles/breakpoints';

import { PromotionModal } from '../ui/modals';

import ChessGrid from './ChessGrid/ChessGrid';

export const ChessBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: relative;

  ${media.lg} {
    margin: 60px;
  }
`;

interface ChessBoardProps {
  size?: number;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ size = 8 }) => {
  const chessGame = useChessGame();
  const { promotionMove, handlePromotion, ...gridProps } = chessGame;

  return (
    <ChessBoardWrapper>
      <PromotionModal
        isOpen={!!promotionMove}
        onPromotionSelect={handlePromotion}
      />
      <ChessGrid {...gridProps} size={size} />
    </ChessBoardWrapper>
  );
};

export default ChessBoard;
