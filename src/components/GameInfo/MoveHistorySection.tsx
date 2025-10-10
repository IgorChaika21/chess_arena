import React from 'react';
import type { JSX } from 'react';
import styled from 'styled-components';

import { useGameStore } from '@/store/useGameStore';
import type { MoveHistory } from '@/types/types';
import { Colors } from '@/types/types';

const Section = styled.div`
  background-color: ${props => props.theme.sectionBg};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.textColor};
  font-size: 1.1rem;
`;

const MovesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const MovesCount = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.textColor}80;
  background-color: ${props => props.theme.bgColor};
  padding: 4px 8px;
  border-radius: 12px;
`;

const MoveHistoryContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  background-color: ${props => props.theme.sectionBg};
  padding: 12px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.9rem;
  border: 1px solid ${props => props.theme.borderColor};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.borderColor};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.textColor}80;
  }
`;

const MoveHistoryItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const MoveNumber = styled.span`
  color: ${props => props.theme.textColor}80;
  font-weight: 500;
`;

const Move = styled.span<{ $color: Colors }>`
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${props =>
    props.$color === Colors.WHITE
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'};
`;

const NoMoves = styled.p`
  text-align: center;
  color: ${props => props.theme.textColor}80;
  font-style: italic;
  margin: 0;
  padding: 16px 0;
`;

const MoveHistorySection: React.FC = () => {
  const { moveHistory } = useGameStore();

  const formatMoveHistory = (moveHistory: MoveHistory) => {
    const formattedMoves: JSX.Element[] = [];

    for (let i = 0; i < moveHistory.length; i += 2) {
      const whiteMove = moveHistory[i];
      const blackMove = moveHistory[i + 1];

      formattedMoves.push(
        <MoveHistoryItem key={i}>
          <MoveNumber>{Math.floor(i / 2) + 1}.</MoveNumber>
          <Move $color={Colors.WHITE}>{whiteMove.notation}</Move>
          {blackMove && <Move $color={Colors.BLACK}>{blackMove.notation}</Move>}
        </MoveHistoryItem>
      );
    }

    return formattedMoves;
  };

  return (
    <Section>
      <MovesHeader>
        <SectionTitle>Move History</SectionTitle>
        <MovesCount>{moveHistory.length} moves</MovesCount>
      </MovesHeader>
      <MoveHistoryContainer>
        {moveHistory.length > 0 ? (
          formatMoveHistory(moveHistory)
        ) : (
          <NoMoves>No moves yet</NoMoves>
        )}
      </MoveHistoryContainer>
    </Section>
  );
};

export default MoveHistorySection;
