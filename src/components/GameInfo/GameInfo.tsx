import { useState } from 'react';

import {
  GameSetupSection,
  GameStatusSection,
  CapturedPiecesSection,
  MoveHistorySection,
  GameActionsSection,
} from '@/components/GameInfo/sections';
import { useGameStore } from '@/store/useGameStore';
import { Colors } from '@/types/types';

import favicon from '/favicon.ico';
import { ConfirmationModal } from '../ui/modals';

import { GameInfoContainer, GameTitle, GameTitleIcon } from './GameInfo.styles';

const GameInfo: React.FC = () => {
  const { currentPlayer, resign, gameStarted } = useGameStore();
  const [showResignModal, setShowResignModal] = useState(false);

  const modalMessage = `Are you sure you want to resign? This will end the game and declare
    ${currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE} as the winner.`;

  const handleResignConfirm = () => {
    resign(currentPlayer);
    setShowResignModal(false);
  };

  return (
    <GameInfoContainer>
      <GameTitle>
        <GameTitleIcon src={favicon} alt="Chess Icon" /> Chess Arena
      </GameTitle>

      {!gameStarted && <GameSetupSection />}
      {gameStarted && (
        <>
          <GameStatusSection />
          <CapturedPiecesSection />
          <MoveHistorySection />
          <GameActionsSection onResign={() => setShowResignModal(true)} />
        </>
      )}

      <ConfirmationModal
        isOpen={showResignModal}
        title="Confirm Resignation"
        message={modalMessage}
        onConfirm={handleResignConfirm}
        onCancel={() => setShowResignModal(false)}
      />
    </GameInfoContainer>
  );
};

export default GameInfo;
