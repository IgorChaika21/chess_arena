import styled from 'styled-components';

export const SquareContainer = styled.div<{
  $isDark: boolean;
  $isSelected: boolean;
}>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  background-color: ${props =>
    props.$isSelected
      ? props.theme.chessSelected
      : props.$isDark
        ? props.theme.chessDarkSquare
        : props.theme.chessLightSquare};
  transition: background-color 0.2s ease;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
