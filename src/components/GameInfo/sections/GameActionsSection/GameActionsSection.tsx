import React from 'react';

import { useGameStore, useEffectiveGameStatus } from '@/store/useGameStore';
import { GameMode, GameStatus } from '@/types/types';

import { Section, SectionTitle } from '../sections.styles';

import {
  GameActionsContainer,
  ResignButton,
  ResetButton,
} from './GameActionsSection.styles';

interface GameActionsSectionProps {
  onResign: () => void;
}

const GameActionsSection: React.FC<GameActionsSectionProps> = ({
  onResign,
}) => {
  const { currentPlayer, resignedPlayer, gameMode, playerColor, resetGame } =
    useGameStore();
  const gameStatus = useEffectiveGameStatus();

  const isGameOver =
    gameStatus === GameStatus.CHECKMATE ||
    gameStatus === GameStatus.STALEMATE ||
    !!resignedPlayer;

  const isResignDisabled =
    !!resignedPlayer ||
    (gameMode === GameMode.PVB && currentPlayer !== playerColor);

  const newGameButton = (
    <ResetButton onClick={resetGame}>
      <span>🔄</span>New Game
    </ResetButton>
  );

  const resignButton = (
    <ResignButton onClick={onResign} disabled={isResignDisabled}>
      <span>🏳️</span>Resign
    </ResignButton>
  );
  return (
    <Section>
      <SectionTitle>Game Actions</SectionTitle>
      <GameActionsContainer>
        {isGameOver ? newGameButton : resignButton}
      </GameActionsContainer>
    </Section>
  );
};

export default GameActionsSection;
