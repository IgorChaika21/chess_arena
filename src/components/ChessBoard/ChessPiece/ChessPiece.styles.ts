import styled from 'styled-components';

export const ChessPieceImage = styled.img<{ $size: number }>`
  width: min(${props => props.$size}px, 8vmin);
  height: min(${props => props.$size}px, 8vmin);
  user-select: none;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
`;
