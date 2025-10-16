import React from 'react';

import { gameStatusText } from '@/constants/constants';
import { useGameTimer, formatTime } from '@/hooks/chessGame/useGameTimer';
import { useGameStore, useEffectiveGameStatus } from '@/store/useGameStore';
import { GameMode, GameStatus } from '@/types/types';

import { Section, SectionTitle } from '../sections.styles';

import {
  StatusGrid,
  StatusItem,
  StatusLabel,
  StatusValue,
} from './GameStatusSection.styles';

const GameStatusSection: React.FC = () => {
  const { gameStarted, gameMode, playerColor, currentPlayer, resignedPlayer } =
    useGameStore();

  const gameStatus = useEffectiveGameStatus();

  const timeElapsed = useGameTimer(gameStarted, gameStatus);

  const getStatusVariant = () => {
    if (resignedPlayer) return GameStatus.CHECKMATE;
    return gameStatus;
  };

  const getStatusText = () => {
    if (resignedPlayer) {
      return `${resignedPlayer.charAt(0).toUpperCase() + resignedPlayer.slice(1)} resigned!`;
    }
    return gameStatusText[gameStatus];
  };

  return (
    <Section>
      <SectionTitle>Game Status</SectionTitle>
      <StatusGrid>
        <StatusItem>
          <StatusLabel>Mode:</StatusLabel>
          <StatusValue>
            {gameMode === GameMode.PVP ? 'Player vs Player' : 'Player vs Bot'}
          </StatusValue>
        </StatusItem>

        {gameMode === GameMode.PVB && (
          <StatusItem>
            <StatusLabel>You are:</StatusLabel>
            <StatusValue $variant={playerColor}>
              {playerColor.charAt(0).toUpperCase() + playerColor.slice(1)}
            </StatusValue>
          </StatusItem>
        )}

        <StatusItem>
          <StatusLabel>Turn:</StatusLabel>
          <StatusValue $variant={currentPlayer}>
            {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
            {gameMode === GameMode.PVB && currentPlayer !== playerColor
              ? ' (Bot)'
              : ''}
          </StatusValue>
        </StatusItem>

        <StatusItem>
          <StatusLabel>Status:</StatusLabel>
          <StatusValue $variant={getStatusVariant()}>
            {getStatusText()}
          </StatusValue>
        </StatusItem>

        <StatusItem>
          <StatusLabel>Time:</StatusLabel>
          <StatusValue $variant="time">{formatTime(timeElapsed)}</StatusValue>
        </StatusItem>
      </StatusGrid>
    </Section>
  );
};

export default GameStatusSection;
