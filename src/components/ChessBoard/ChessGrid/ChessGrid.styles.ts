import styled from 'styled-components';

import { media } from '@/styles/breakpoints';

export const ChessBoardAndRowLabels = styled.div`
  display: flex;
  align-items: stretch;
`;

export const BoardGrid = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #333;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 64vmin;
  height: 64vmin;
  max-width: 720px;
  max-height: 720px;

  ${media.xl} {
    width: 56vmin;
    height: 56vmin;
    max-width: 700px;
    max-height: 700px;
  }

  ${media.lg} {
    width: 80vmin;
    height: 80vmin;
    max-width: none;
    max-height: none;
  }
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
`;

export const ColumnLabels = styled.div`
  background-color: #b58863;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-left: 20px;
  height: 20px;
  flex-shrink: 0;

  ${media.sm} {
    padding-left: 12px;
    height: 12px;
  }
`;

export const RowLabels = styled.div`
  background-color: #b58863;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid #333;
  padding: 5px 0;
  width: 20px;
  flex-shrink: 0;

  ${media.sm} {
    width: 12px;
    padding: 3px 0;
  }
`;

export const NotationLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5a3921;
  font-weight: bold;
  font-size: calc(90vmin / 8 * 0.15);
  font-family: 'Arial', sans-serif;
  user-select: none;
  width: 100%;
  height: 100%;

  ${media.xl} {
    font-size: calc(95vmin / 8 * 0.15);
  }
`;

export const NotationColumnLabel = styled(NotationLabel)`
  width: auto;
  height: 100%;
  max-width: none;
  max-height: none;

  ${media.xl} {
    width: auto;
  }

  ${media.lg} {
    width: auto;
  }
`;
