import React, { useState } from 'react';
import styled from 'styled-components';

import { useGameStore, useEffectiveGameStatus } from '@/store/useGameStore';
import { GameStatus, Colors } from '@/types/types';

import ConfirmationModal from '../ui/modals/ConfirmationModal/ConfirmationModal';

const GameInfoContainer = styled.div`
  background-color: ${props => props.theme.bgColor};
  border-radius: 8px;
  padding: 20px;
  border: 1px solid ${props => props.theme.borderColor};
  min-width: 250px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  color: ${props => props.theme.textColor};
`;

const StatusText = styled.p<{ $variant?: 'check' | 'checkmate' | 'stalemate' }>`
  color: ${props => {
    switch (props.$variant) {
      case 'check':
        return '#ff9800';
      case 'checkmate':
        return '#f44336';
      case 'stalemate':
        return '#9e9e9e';
      default:
        return props.theme.textColor;
    }
  }};
  font-weight: ${props => (props.$variant ? 'bold' : 'normal')};
  margin: 5px 0;
`;

const Button = styled.button`
  background-color: ${props => props.theme.borderColor};
  color: ${props => props.theme.textColor};
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.bgColor};
  }
`;

const GameInfo: React.FC = () => {
  const {
    currentPlayer,
    resetGame,
    startGame,
    gameStarted,
    resign,
    resignedPlayer,
  } = useGameStore();

  const effectiveGameStatus = useEffectiveGameStatus();
  const [showResignModal, setShowResignModal] = useState(false);

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
      <Section>
        <SectionTitle>Game Status</SectionTitle>
        <StatusText>Current Player: {currentPlayer}</StatusText>
        <StatusText $variant={statusInfo.variant}>
          Status: {statusInfo.text}
        </StatusText>
        {!gameStarted && <StatusText>Click "Start Game" to begin</StatusText>}
      </Section>

      <Section>
        <SectionTitle>Actions</SectionTitle>
        {!gameStarted ? (
          <Button onClick={startGame}>Start Game</Button>
        ) : (
          <>
            {!isGameOver && (
              <Button
                onClick={handleResignClick}
                style={{ backgroundColor: '#f44336', color: 'white' }}
              >
                Resign
              </Button>
            )}
            <Button onClick={resetGame}>
              {isGameOver ? 'New Game' : 'Reset Game'}
            </Button>
          </>
        )}
      </Section>

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
