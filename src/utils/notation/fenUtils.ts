import { Colors, FigureNames } from '@/types/types';
import type { Board, ChessPiece } from '@/types/types';

export const convertBoardToFEN = (
  board: Board,
  currentPlayer: Colors
): string => {
  let fen = '';

  for (let row = 0; row < 8; row++) {
    let emptyCount = 0;

    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (!piece) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += getFENPieceSymbol(piece);
      }
    }

    if (emptyCount > 0) {
      fen += emptyCount;
    }

    if (row < 7) {
      fen += '/';
    }
  }

  fen += ` ${currentPlayer === Colors.WHITE ? 'w' : 'b'}`;

  fen += ' KQkq';

  fen += ' -';

  fen += ' 0 1';

  return fen;
};

const getFENPieceSymbol = (piece: ChessPiece): string => {
  const symbols: Record<FigureNames, string> = {
    [FigureNames.KING]: 'k',
    [FigureNames.QUEEN]: 'q',
    [FigureNames.ROOK]: 'r',
    [FigureNames.BISHOP]: 'b',
    [FigureNames.KNIGHT]: 'n',
    [FigureNames.PAWN]: 'p',
  };

  const symbol = symbols[piece.type];
  return piece.color === Colors.WHITE ? symbol.toUpperCase() : symbol;
};
