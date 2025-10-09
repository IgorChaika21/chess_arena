import React, { useMemo, type JSX } from 'react';
import styled from 'styled-components';

import ChessPiece from '@/components/ChessBoard/ChessPiece/ChessPiece';
import { useGameStore } from '@/store/useGameStore';
import { Colors, FigureNames } from '@/types/types';
import type { ChessPiece as ChessPieceType } from '@/types/types';

const Section = styled.div`
  background-color: ${props => props.theme.sectionBg};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 12px;
  color: ${props => props.theme.textColor};
  font-size: 1.1rem;
`;

const CapturedPiecesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CapturedPiecesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CapturedLabel = styled.span`
  font-weight: 500;
  color: ${props => props.theme.textColor};
  min-width: 80px;
`;

const CapturedPiecesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  flex: 1;
`;

const CapturedPiece = styled.div<{ $color: Colors }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${props =>
    props.$color === Colors.WHITE
      ? 'rgba(0, 0, 0, 0.7)'
      : 'rgba(255, 255, 255, 0.7)'};
  color: ${props => props.$color};
  border: 1px solid
    ${props =>
      props.$color === Colors.WHITE
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)'};
`;

const PieceCount = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
`;

const NoCaptured = styled.span`
  color: ${props => props.theme.textColor}80;
  font-style: italic;
  font-size: 0.9rem;
`;

const CapturedPiecesSection: React.FC = () => {
  const { capturedPieces } = useGameStore();

  const pieceCounts = useMemo(() => {
    const countPiecesByType = (pieces: ChessPieceType[]) => {
      const counts: Record<string, number> = {};
      pieces.forEach(piece => {
        counts[piece.type] = (counts[piece.type] || 0) + 1;
      });
      return counts;
    };

    return {
      white: countPiecesByType(capturedPieces.white),
      black: countPiecesByType(capturedPieces.black),
    };
  }, [capturedPieces]);

  const pieceOrder = useMemo(
    () => [
      FigureNames.QUEEN,
      FigureNames.ROOK,
      FigureNames.BISHOP,
      FigureNames.KNIGHT,
      FigureNames.PAWN,
    ],
    []
  );

  const renderCapturedPieces = (counts: Record<string, number>, color: Colors) => {
    const elements: JSX.Element[] = [];

    pieceOrder.forEach(type => {
      const count = counts[type];
      if (count && count > 0) {
        elements.push(
          <CapturedPiece key={type} $color={color}>
            <ChessPiece type={type} color={color} size={16} />
            <PieceCount>×{count}</PieceCount>
          </CapturedPiece>
        );
      }
    });

    return elements.length > 0 ? elements : <NoCaptured>None</NoCaptured>;
  };

  return (
    <Section>
      <SectionTitle>Captured Pieces</SectionTitle>
      <CapturedPiecesContainer>
        <CapturedPiecesRow>
          <CapturedLabel>Сaptured by white:</CapturedLabel>
          <CapturedPiecesList>
            {renderCapturedPieces(pieceCounts.black, Colors.BLACK)}
          </CapturedPiecesList>
        </CapturedPiecesRow>
        
        <CapturedPiecesRow>
          <CapturedLabel>Сaptured by black:</CapturedLabel>
          <CapturedPiecesList>
            {renderCapturedPieces(pieceCounts.white, Colors.WHITE)}
          </CapturedPiecesList>
        </CapturedPiecesRow>
      </CapturedPiecesContainer>
    </Section>
  );
};

export default CapturedPiecesSection;