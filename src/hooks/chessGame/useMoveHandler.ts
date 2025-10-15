import { useMemo, useCallback } from 'react';

import { useGameStore } from '@/store/useGameStore';
import { GameMode } from '@/types/types';
import type {
  PromotionPieceType,
  ApplyMoveResult,
  ChessPiece,
  BoardPosition,
} from '@/types/types';
import { applyMove } from '@/utils/moves/applyMove';
import { isValidMove } from '@/utils/rules/moveValidation';

import type { UseBoardState } from './useBoardState';

export function useMoveHandler(boardState: UseBoardState) {
  const {
    board,
    setBoard,
    selectedSquare,
    setSelectedSquare,
    enPassantTarget,
    setEnPassantTarget,
    promotionMove,
    setPromotionMove,
  } = boardState;

  const {
    currentPlayer,
    setCurrentPlayer,
    setGameStatus,
    capturedPieces,
    setCapturedPieces,
    moveHistory,
    setMoveHistory,
    gameMode,
    playerColor,
    gameStarted,
  } = useGameStore();

  const canInteractWithBoard = useCallback((): boolean => {
    return (
      gameStarted &&
      !promotionMove &&
      !(gameMode === GameMode.PVB && currentPlayer !== playerColor)
    );
  }, [gameStarted, promotionMove, gameMode, currentPlayer, playerColor]);

  const canSelectPiece = useCallback(
    (piece: ChessPiece | null): boolean => {
      return !!(piece && piece.color === currentPlayer);
    },
    [currentPlayer]
  );

  const isSameSquare = useCallback(
    (square1: BoardPosition | null, square2: BoardPosition): boolean => {
      return square1?.[0] === square2[0] && square1?.[1] === square2[1];
    },
    []
  );

  const updateState = useCallback(
    (result: ApplyMoveResult) => {
      const {
        newBoard,
        newCapturedPieces,
        newEnPassantTarget,
        newMoveHistory,
        newGameStatus,
        nextPlayer,
      } = result;

      setBoard(newBoard);
      setCapturedPieces(newCapturedPieces);
      setMoveHistory(newMoveHistory);
      setEnPassantTarget(newEnPassantTarget);
      setGameStatus(newGameStatus);
      setCurrentPlayer(nextPlayer);
      setPromotionMove(null);
      setSelectedSquare(null);
    },
    [
      setBoard,
      setCapturedPieces,
      setMoveHistory,
      setEnPassantTarget,
      setGameStatus,
      setCurrentPlayer,
      setPromotionMove,
      setSelectedSquare,
    ]
  );

  const moveDependencies = useMemo(
    () => ({
      board,
      enPassantTarget,
      currentPlayer,
      capturedPieces,
      moveHistory,
    }),
    [board, enPassantTarget, currentPlayer, capturedPieces, moveHistory]
  );

  const stateSetters = useMemo(
    () => ({
      setSelectedSquare,
      setPromotionMove,
      updateState,
    }),
    [setSelectedSquare, setPromotionMove, updateState]
  );

  const validators = useMemo(
    () => ({
      canInteractWithBoard,
      isSameSquare,
      canSelectPiece,
    }),
    [canInteractWithBoard, isSameSquare, canSelectPiece]
  );

  const possibleMoves = useMemo<BoardPosition[]>(() => {
    if (!gameStarted || !selectedSquare) return [];

    const { board, enPassantTarget, currentPlayer } = moveDependencies;

    const [sr, sc] = selectedSquare;
    const piece = board[sr][sc];
    if (!piece || piece.color !== currentPlayer) return [];

    const moves: BoardPosition[] = [];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (
          isValidMove(
            board,
            selectedSquare,
            [r, c],
            enPassantTarget,
            currentPlayer
          )
        ) {
          moves.push([r, c]);
        }
      }
    }

    return moves;
  }, [gameStarted, selectedSquare, moveDependencies]);

  const handlePromotion = useCallback(
    (pieceType: PromotionPieceType) => {
      if (!promotionMove) return;

      const { from, to } = promotionMove;
      const {
        board,
        enPassantTarget,
        currentPlayer,
        capturedPieces,
        moveHistory,
      } = moveDependencies;

      const result = applyMove({
        board,
        from,
        to,
        currentPlayer,
        enPassantTarget,
        capturedPieces,
        moveHistory,
        promotionPieceType: pieceType,
      });

      stateSetters.updateState(result);
    },
    [promotionMove, moveDependencies, stateSetters]
  );

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      const {
        board,
        enPassantTarget,
        currentPlayer,
        capturedPieces,
        moveHistory,
      } = moveDependencies;
      const { setSelectedSquare, setPromotionMove, updateState } = stateSetters;
      const { canInteractWithBoard, isSameSquare, canSelectPiece } = validators;

      if (!canInteractWithBoard()) return;

      const clickedSquare: BoardPosition = [row, col];
      const piece = board[row][col];

      if (isSameSquare(selectedSquare, clickedSquare)) {
        setSelectedSquare(null);
        return;
      }

      if (canSelectPiece(piece)) {
        setSelectedSquare(clickedSquare);
        return;
      }

      if (selectedSquare) {
        const [sr, sc] = selectedSquare;
        const selectedPiece = board[sr][sc];

        if (!selectedPiece) {
          setSelectedSquare(null);
          return;
        }

        if (
          isValidMove(
            board,
            [sr, sc],
            clickedSquare,
            enPassantTarget,
            currentPlayer
          )
        ) {
          try {
            const result = applyMove({
              board,
              from: selectedSquare,
              to: clickedSquare,
              currentPlayer,
              enPassantTarget,
              capturedPieces,
              moveHistory,
            });

            if (result.promotionRequired) {
              setPromotionMove({ from: [sr, sc], to: clickedSquare });
              return;
            }

            updateState(result);
          } catch (err) {
            console.error('Move error:', err);
            setSelectedSquare(null);
          }
        } else {
          setSelectedSquare(null);
        }
      }
    },
    [moveDependencies, stateSetters, validators, selectedSquare]
  );

  return {
    handleSquareClick,
    handlePromotion,
    possibleMoves,
  };
}
