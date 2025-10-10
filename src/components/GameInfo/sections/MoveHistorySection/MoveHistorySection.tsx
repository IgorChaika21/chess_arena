import React from 'react';
import type { JSX } from 'react';

import { useGameStore } from '@/store/useGameStore';
import type { MoveHistory } from '@/types/types';
import { Colors } from '@/types/types';

import { Section } from '../sections.styles';

import {
  MovesHeader,
  StyledSectionTitle,
  MovesCount,
  MoveHistoryItem,
  MoveHistoryContainer,
  MoveNumber,
  Move,
  NoMoves,
} from './MoveHistorySection.styles';

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
        <StyledSectionTitle>Move History</StyledSectionTitle>
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
