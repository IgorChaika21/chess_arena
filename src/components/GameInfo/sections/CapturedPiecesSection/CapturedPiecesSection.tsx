import React, { useMemo } from 'react';

import ChessPiece from '@/components/ChessBoard/ChessPiece/ChessPiece';
import { useGameStore } from '@/store/useGameStore';
import { Colors, FigureNames } from '@/types/types';
import type { ChessPiece as ChessPieceType } from '@/types/types';

import { Section, SectionTitle } from '../sections.styles';

import {
  CapturedPiecesContainer,
  CapturedPiecesSectionWrapper,
  CapturedHeader,
  CapturedLabel,
  CapturedPiecesList,
  CapturedPiece,
  NoCaptured,
} from './CapturedPiecesSection.styles';

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

  const renderCapturedPieces = useMemo(() => {
    return (counts: Record<string, number>, color: Colors) => {
      return pieceOrder.map(type => {
        if (!counts[type] || counts[type] === 0) return null;

        return (
          <CapturedPiece key={type} $color={color}>
            <ChessPiece type={type} color={color} size={20} />×
            {counts[type]}{' '}
          </CapturedPiece>
        );
      });
    };
  }, [pieceOrder]);

  const capturedContent = useMemo(() => {
    const whitePieces = renderCapturedPieces(pieceCounts.white, Colors.BLACK);
    const blackPieces = renderCapturedPieces(pieceCounts.black, Colors.WHITE);

    const hasWhiteCaptured = Object.keys(pieceCounts.white).length > 0;
    const hasBlackCaptured = Object.keys(pieceCounts.black).length > 0;

    return { whitePieces, blackPieces, hasWhiteCaptured, hasBlackCaptured };
  }, [pieceCounts, renderCapturedPieces]);

  return (
    <Section>
      <SectionTitle>Captured Pieces</SectionTitle>
      <CapturedPiecesContainer>
        <CapturedPiecesSectionWrapper $color={Colors.WHITE}>
          <CapturedHeader>
            <CapturedLabel>White Captured:</CapturedLabel>
          </CapturedHeader>
          <CapturedPiecesList $color={Colors.WHITE}>
            {capturedContent.hasWhiteCaptured ? (
              capturedContent.whitePieces
            ) : (
              <NoCaptured>None</NoCaptured>
            )}
          </CapturedPiecesList>
        </CapturedPiecesSectionWrapper>

        <CapturedPiecesSectionWrapper $color={Colors.BLACK}>
          <CapturedHeader>
            <CapturedLabel>Black Captured:</CapturedLabel>
          </CapturedHeader>
          <CapturedPiecesList $color={Colors.BLACK}>
            {capturedContent.hasBlackCaptured ? (
              capturedContent.blackPieces
            ) : (
              <NoCaptured>None</NoCaptured>
            )}
          </CapturedPiecesList>
        </CapturedPiecesSectionWrapper>
      </CapturedPiecesContainer>
    </Section>
  );
};

export default CapturedPiecesSection;
