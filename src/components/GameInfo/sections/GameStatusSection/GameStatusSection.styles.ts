import styled from 'styled-components';

import { media } from '@/styles/breakpoints';
import { GameStatus, Colors } from '@/types/types';

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatusLabel = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.textColor}80;
  font-weight: 500;
`;

export const StatusValue = styled.span<{
  $variant?: Colors | 'time' | GameStatus;
}>`
  font-weight: 600;
  color: ${props => {
    switch (props.$variant) {
      case Colors.WHITE:
        return props.theme.buttonPrimary;
      case Colors.BLACK:
        return props.theme.textColor;
      case GameStatus.CHECK:
        return '#ff9800';
      case GameStatus.CHECKMATE:
        return '#f44336';
      case GameStatus.STALEMATE:
        return '#9e9e9e';
      case 'time':
        return props.theme.textColor;
      default:
        return props.theme.textColor;
    }
  }};
  font-family: ${props =>
    props.$variant === 'time' ? 'monospace' : 'inherit'};
  font-size: ${props => (props.$variant === 'time' ? '1.1rem' : 'inherit')};
`;
