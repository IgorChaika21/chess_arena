import styled from 'styled-components';

import { Colors } from '@/types/types';

export const CapturedPiecesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CapturedPiecesSectionWrapper = styled.div<{ $color: Colors }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CapturedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CapturedLabel = styled.span`
  font-weight: 500;
  color: ${props => props.theme.textColor};
  font-size: 0.95rem;
`;

export const CapturedPiecesList = styled.div<{ $color: Colors }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 28px;
`;

export const CapturedPiece = styled.span<{ $color: Colors }>`
  font-size: 1.4rem;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$color};
  background-color: ${props =>
    props.$color === 'white'
      ? 'rgba(0, 0, 0, 0.7)'
      : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid
    ${props =>
      props.$color === 'white'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)'};
`;

export const NoCaptured = styled.span`
  color: ${props => props.theme.textColor};
  font-style: italic;
`;
