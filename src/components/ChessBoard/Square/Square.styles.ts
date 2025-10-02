import styled from 'styled-components';

export const SquareContainer = styled.div<{
  $isDark: boolean;
  $isSelected: boolean;
  $isMoveOption: boolean;
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

  ${props =>
    props.$isSelected &&
    `
    outline: 3px solid ${props.theme.borderColor};
    outline-offset: -3px;
  `}

  transition: all 0.2s ease;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  ${props =>
    props.$isMoveOption &&
    `
    &::before {
      content: "";
      position: absolute;
      width: 25%;
      height: 25%;
      border-radius: 50%;
      background-color: ${props.$isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
      pointer-events: none;
      z-index: 1;
    }
  `}
`;
