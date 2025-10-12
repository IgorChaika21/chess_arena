import type { Board, Colors } from '@/types/types';
import { convertBoardToFEN } from '@/utils/notation/fenUtils';

export class StockfishService {
  private worker: Worker | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    try {
      this.worker = new Worker('/stockfish.js');

      return new Promise(resolve => {
        if (!this.worker) {
          resolve();
          return;
        }

        this.worker.onmessage = event => {
          const message = event.data;
          if (message === 'readyok') {
            this.isInitialized = true;
            resolve();
          }
        };

        this.worker.postMessage('uci');
        this.worker.postMessage('isready');
      });
    } catch (error) {
      console.error('Failed to initialize Stockfish:', error);
      this.isInitialized = false;
    }
  }

  async getBestMove(
    board: Board,
    currentPlayer: Colors,
    thinkTime = 2000
  ): Promise<string | null> {
    if (!this.worker || !this.isInitialized) {
      return null;
    }

    const fen = convertBoardToFEN(board, currentPlayer);

    return new Promise(resolve => {
      const messageHandler = (event: MessageEvent) => {
        const message = event.data;

        if (message.startsWith('bestmove')) {
          const parts = message.split(' ');
          if (parts.length >= 2 && parts[1] !== '(none)') {
            this.worker?.removeEventListener('message', messageHandler);
            resolve(parts[1]);
          }
        }
      };

      this.worker?.addEventListener('message', messageHandler);
      this.worker?.postMessage(`position fen ${fen}`);
      this.worker?.postMessage(`go movetime ${thinkTime}`);

      setTimeout(() => {
        this.worker?.removeEventListener('message', messageHandler);
        resolve(null);
      }, thinkTime + 500);
    });
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.isInitialized = false;
    }
  }
}
