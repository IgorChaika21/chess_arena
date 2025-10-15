import { useEffect, useRef, useCallback, useMemo } from 'react';

import { makeBotMove } from '@/engine/botAI';
import { StockfishService } from '@/engine/stockfishService';
import { useGameStore, useEffectiveGameStatus } from '@/store/useGameStore';
import { Colors, GameMode, GameStatus } from '@/types/types';
import type { Board, CapturedPieces, Move, BoardPosition } from '@/types/types';
import { getRandomMove } from '@/utils/bot/randomBotMove';
import { handleBotMove } from '@/utils/moves/botMove';

import type { UseBoardState } from './useBoardState';

interface MoveParams {
  board: Board;
  currentPlayer: Colors;
  enPassantTarget: BoardPosition | null;
  capturedPieces: CapturedPieces;
  moveHistory: Move[];
}

export function useBotPlayer(boardState: UseBoardState) {
  const {
    board,
    setBoard,
    setSelectedSquare,
    enPassantTarget,
    setEnPassantTarget,
    promotionMove,
  } = boardState;

  const {
    currentPlayer,
    setCurrentPlayer,
    setGameStatus,
    capturedPieces,
    setCapturedPieces,
    moveHistory,
    setMoveHistory,
    gameStarted,
    gameMode,
    playerColor,
  } = useGameStore();

  const gameStatus = useEffectiveGameStatus();
  const stockfishRef = useRef<StockfishService | null>(null);

  const shouldMakeBotMove = useMemo(() => {
    return (
      gameStarted &&
      gameMode === GameMode.PVB &&
      currentPlayer !== playerColor &&
      !promotionMove &&
      (gameStatus === GameStatus.IN_PROGRESS || gameStatus === GameStatus.CHECK)
    );
  }, [
    gameStarted,
    gameMode,
    currentPlayer,
    playerColor,
    promotionMove,
    gameStatus,
  ]);

  const applyBotMove = useCallback(
    (moveParams: MoveParams, from: BoardPosition, to: BoardPosition) => {
      try {
        const {
          board,
          currentPlayer,
          enPassantTarget,
          capturedPieces,
          moveHistory,
        } = moveParams;

        const {
          newBoard,
          newCapturedPieces,
          newEnPassantTarget,
          newMoveHistory,
          newGameStatus,
          nextPlayer,
        } = handleBotMove(
          board,
          from,
          to,
          currentPlayer,
          enPassantTarget,
          capturedPieces,
          moveHistory
        );

        setBoard(newBoard);
        setCapturedPieces(newCapturedPieces);
        setEnPassantTarget(newEnPassantTarget);
        setMoveHistory(newMoveHistory);
        setGameStatus(newGameStatus);
        setCurrentPlayer(nextPlayer);
        setSelectedSquare(null);
      } catch (error) {
        console.error('Bot move application error:', error);
      }
    },
    [
      setBoard,
      setCapturedPieces,
      setCurrentPlayer,
      setEnPassantTarget,
      setGameStatus,
      setMoveHistory,
      setSelectedSquare,
    ]
  );

  const handleBotMoveInComponent = useCallback(
    (from: BoardPosition, to: BoardPosition) => {
      const moveParams: MoveParams = {
        board,
        currentPlayer,
        enPassantTarget,
        capturedPieces,
        moveHistory,
      };

      applyBotMove(moveParams, from, to);
    },
    [
      applyBotMove,
      board,
      currentPlayer,
      enPassantTarget,
      capturedPieces,
      moveHistory,
    ]
  );

  useEffect(() => {
    stockfishRef.current = new StockfishService();
    stockfishRef.current.initialize();

    return () => {
      if (stockfishRef.current) stockfishRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (shouldMakeBotMove) {
      const timer = setTimeout(async () => {
        try {
          const botMove = await makeBotMove(
            board,
            currentPlayer,
            stockfishRef.current
          );
          if (botMove) {
            handleBotMoveInComponent(botMove.from, botMove.to);
            return;
          }
        } catch (err) {
          console.error('Bot move error:', err);
        }

        const randomMove = getRandomMove(board, currentPlayer, enPassantTarget);
        if (randomMove) {
          handleBotMoveInComponent(randomMove.from, randomMove.to);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    shouldMakeBotMove,
    board,
    currentPlayer,
    enPassantTarget,
    handleBotMoveInComponent,
  ]);
}
