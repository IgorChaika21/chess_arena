import styled from 'styled-components';

export const ChessPieceImage = styled.img<{ $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  user-select: none;
  pointer-events: none;

  @media (max-width: 768px) {
    width: ${props => props.$size * 0.8}px;
    height: ${props => props.$size * 0.8}px;
  }
`;