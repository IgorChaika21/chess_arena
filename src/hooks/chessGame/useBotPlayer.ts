import { useEffect, useRef, useCallback } from 'react';

import { makeBotMove } from '@/engine/botAI';
import { StockfishService } from '@/engine/stockfishService';
import { useGameStore } from '@/store/useGameStore';
import { Colors, GameStatus } from '@/types/types';
import type { BoardPosition } from '@/types/types';
import { applyMove } from '@/utils/moves/applyMove';

import type { UseBoardState } from './useBoardState';

enum GameMode {
  PVP = 'pvp',
  PVB = 'pvb',
}

interface UseBotPlayerProps {
  boardState: UseBoardState;
}

export function useBotPlayer({ boardState }: UseBotPlayerProps) {
  const {
    board,
    enPassantTarget,
    setBoard,
    setEnPassantTarget,
    setSelectedSquare,
  } = boardState;

  const {
    currentPlayer,
    gameStarted,
    gameStatus,
    moveHistory,
    capturedPieces,
    setCurrentPlayer,
    setGameStatus,
    setMoveHistory,
    setCapturedPieces,
  } = useGameStore();

  const gameMode = GameMode.PVB;
  const playerColor = Colors.WHITE;

  const stockfishRef = useRef<StockfishService | null>(null);
  const lastMoveCountRef = useRef(0);

  const applyBotMove = useCallback(
    (from: BoardPosition, to: BoardPosition) => {
      try {
        const result = applyMove(
          board,
          from,
          to,
          currentPlayer,
          enPassantTarget,
          capturedPieces,
          moveHistory
        );

        setBoard(result.newBoard);
        setCapturedPieces(result.newCapturedPieces);
        setEnPassantTarget(result.newEnPassantTarget);
        setMoveHistory(result.newMoveHistory);
        setGameStatus(result.newGameStatus);
        setCurrentPlayer(result.nextPlayer);
        setSelectedSquare(null);

        console.log('🤖 Bot move applied successfully');
      } catch (error) {
        console.error('🤖 Failed to apply bot move:', error);
      }
    },
    [
      board,
      currentPlayer,
      enPassantTarget,
      capturedPieces,
      moveHistory,
      setBoard,
      setCapturedPieces,
      setEnPassantTarget,
      setMoveHistory,
      setGameStatus,
      setCurrentPlayer,
      setSelectedSquare,
    ]
  );

  const makeAndApplyBotMove = useCallback(async () => {
    if (!stockfishRef.current) return;

    console.log('🤖 Bot starting move calculation...');
    try {
      const botMove = await makeBotMove(
        board,
        currentPlayer,
        stockfishRef.current
      );

      if (botMove) {
        console.log('🤖 Bot move found, applying:', botMove);
        applyBotMove(botMove.from, botMove.to);
      } else {
        console.log('🤖 No valid bot move found');
      }
    } catch (error) {
      console.error('🤖 Bot move failed:', error);
    }
  }, [board, currentPlayer, applyBotMove]);

  useEffect(() => {
    stockfishRef.current = new StockfishService();
    stockfishRef.current.initialize();

    return () => {
      if (stockfishRef.current) stockfishRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    const isBotTurn =
      gameStarted &&
      gameMode === GameMode.PVB &&
      currentPlayer !== playerColor &&
      currentPlayer === Colors.BLACK &&
      (gameStatus === GameStatus.IN_PROGRESS ||
        gameStatus === GameStatus.CHECK);

    if (isBotTurn && moveHistory.length > lastMoveCountRef.current) {
      console.log('🤖 New bot turn detected, triggering move...');
      lastMoveCountRef.current = moveHistory.length;

      const timer = setTimeout(() => {
        makeAndApplyBotMove();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    gameStarted,
    gameMode,
    currentPlayer,
    playerColor,
    gameStatus,
    moveHistory.length,
    makeAndApplyBotMove,
  ]);

  return {
    stockfishRef,
  };
}
