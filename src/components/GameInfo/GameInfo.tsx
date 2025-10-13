import React, { useState } from 'react';

import CapturedPiecesSection from '@/components/GameInfo/sections/CapturedPiecesSection/CapturedPiecesSection';
import GameSetupSection from '@/components/GameInfo/sections/GameSetupSection/GameSetupSection';
import MoveHistorySection from '@/components/GameInfo/sections/MoveHistorySection/MoveHistorySection';
import { useGameTimer, formatTime } from '@/hooks/chessGame/useGameTimer';
import { useGameStore, useEffectiveGameStatus } from '@/store/useGameStore';
import { GameStatus, Colors } from '@/types/types';

import { ConfirmationModal } from '../ui/modals';

import {
  GameInfoContainer,
  Section,
  SectionTitle,
  StatusText,
  Button,
  ButtonGroup,
} from './GameInfo.styles';

const GameInfo: React.FC = () => {
  const { currentPlayer, resetGame, gameStarted, resign, resignedPlayer } =
    useGameStore();

  const effectiveGameStatus = useEffectiveGameStatus();
  const [showResignModal, setShowResignModal] = useState(false);
  const timeElapsed = useGameTimer(gameStarted, effectiveGameStatus);

  const getStatusText = () => {
    if (resignedPlayer) {
      return {
        text: `${resignedPlayer === Colors.WHITE ? 'White' : 'Black'} resigned!`,
        variant: 'checkmate' as const,
      };
    }

    switch (effectiveGameStatus) {
      case GameStatus.CHECK:
        return { text: 'Check!', variant: 'check' as const };
      case GameStatus.CHECKMATE:
        return { text: 'Checkmate!', variant: 'checkmate' as const };
      case GameStatus.STALEMATE:
        return { text: 'Stalemate!', variant: 'stalemate' as const };
      default:
        return { text: 'In Progress', variant: undefined };
    }
  };

  const handleResignClick = () => {
    setShowResignModal(true);
  };

  const handleResignConfirm = () => {
    resign(currentPlayer);
    setShowResignModal(false);
  };

  const handleResignCancel = () => {
    setShowResignModal(false);
  };

  const statusInfo = getStatusText();
  const isGameOver =
    effectiveGameStatus === GameStatus.CHECKMATE ||
    effectiveGameStatus === GameStatus.STALEMATE;

  return (
    <GameInfoContainer>
      {gameStarted && (
        <Section>
          <SectionTitle>Game Status</SectionTitle>
          <StatusText>Current Player: {currentPlayer}</StatusText>
          <StatusText $variant={statusInfo.variant}>
            Status: {statusInfo.text}
          </StatusText>
          <StatusText>Time: {formatTime(timeElapsed)}</StatusText>
        </Section>
      )}

      {!gameStarted && <GameSetupSection />}

      {gameStarted && <CapturedPiecesSection />}
      {gameStarted && <MoveHistorySection />}

      {gameStarted && (
        <Section>
          <SectionTitle>Actions</SectionTitle>
          <ButtonGroup>
            {!isGameOver && (
              <Button
                onClick={handleResignClick}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  flex: 1,
                }}
              >
                Resign
              </Button>
            )}
            <Button onClick={resetGame} style={{ flex: 1 }}>
              {isGameOver ? 'New Game' : 'Reset Game'}
            </Button>
          </ButtonGroup>
        </Section>
      )}

      <ConfirmationModal
        isOpen={showResignModal}
        title="Confirm Resignation"
        message={`Are you sure you want to resign? This will end the game and declare ${
          currentPlayer === Colors.WHITE ? 'Black' : 'White'
        } as the winner.`}
        onConfirm={handleResignConfirm}
        onCancel={handleResignCancel}
        confirmText="Yes, Resign"
        cancelText="Cancel"
      />
    </GameInfoContainer>
  );
};

export default GameInfo;
