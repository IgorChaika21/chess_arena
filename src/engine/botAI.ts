import type { Board, Colors, BoardPosition } from '@/types/types';
import { getRandomMove } from '@/utils/bot/randomBotMove';

import type { StockfishService } from './stockfishService';

export const makeBotMove = async (
  board: Board,
  currentPlayer: Colors,
  stockfishService: StockfishService | null
): Promise<{ from: BoardPosition; to: BoardPosition } | null> => {
  if (stockfishService) {
    return await getStockfishMove(board, currentPlayer, stockfishService);
  }

  return getRandomMove(board, currentPlayer);
};

const getStockfishMove = async (
  board: Board,
  currentPlayer: Colors,
  stockfishService: StockfishService
): Promise<{ from: BoardPosition; to: BoardPosition } | null> => {
  try {
    const bestMove = await stockfishService.getBestMove(board, currentPlayer);

    if (bestMove) {
      const move = convertUciToCoordinates(bestMove);
      if (move) return move;
    }
  } catch (error) {
    console.error('Stockfish move error:', error);
  }

  return getRandomMove(board, currentPlayer);
};

const convertUciToCoordinates = (
  uciMove: string
): { from: BoardPosition; to: BoardPosition } | null => {
  if (uciMove.length < 4) return null;

  const fromCol = uciMove.charCodeAt(0) - 97;
  const fromRow = 8 - parseInt(uciMove[1]);
  const toCol = uciMove.charCodeAt(2) - 97;
  const toRow = 8 - parseInt(uciMove[3]);

  if (
    fromRow >= 0 &&
    fromRow < 8 &&
    fromCol >= 0 &&
    fromCol < 8 &&
    toRow >= 0 &&
    toRow < 8 &&
    toCol >= 0 &&
    toCol < 8
  ) {
    return {
      from: [fromRow, fromCol],
      to: [toRow, toCol],
    };
  }

  return null;
};
