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
      ? 'rgba(255, 255, 0, 0.7)'
      : props.$isDark
        ? '#b58863'
        : '#f0d9b5'};

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
