import styled from 'styled-components';

import { media } from '@/styles/breakpoints';

export const SetupOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionTitle = styled.h4`
  margin: 0 0 12px 0;
  color: ${props => props.theme.textColor};
  font-size: 1rem;
  font-weight: 500;
`;

export const GameModeSelection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  ${media.xl} {
    flex-direction: column;
  }

  ${media.lg} {
    flex-direction: row;
  }

  ${media.sm} {
    flex-direction: column;
  }
`;

export const ModeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 16px 12px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  background-color: ${props =>
    props.$active ? props.theme.success : props.theme.buttonBg};
  color: ${props => (props.$active ? 'white' : props.theme.textColor)};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  &:hover {
    background-color: ${props =>
      props.$active ? props.theme.success : props.theme.buttonHover};
    transform: translateY(-2px);
  }

  ${media.lg} {
    padding: 12px 8px;
    font-size: 12px;
  }
`;

export const ColorSelection = styled.div`
  margin-bottom: 20px;
`;

export const ColorButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;

  ${media.sm} {
    flex-direction: column;
  }
`;

export const ColorButton = styled.button<{
  $color: 'white' | 'black';
  $active: boolean;
}>`
  flex: 1;
  padding: 16px 12px;
  border: 2px solid
    ${props =>
      props.$active ? props.theme.buttonPrimary : props.theme.borderColor};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background-color: ${props =>
    props.$color === 'white'
      ? props.$active
        ? '#f0f0f0'
        : '#e0e0e0'
      : props.$active
        ? '#333'
        : '#222'};

  color: ${props => (props.$color === 'white' ? '#333' : '#f0f0f0')};

  box-shadow: ${props =>
    props.$active ? `0 0 0 3px ${props.theme.buttonPrimary}20` : 'none'};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ColorSwatch = styled.span<{ $color: 'white' | 'black' }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.borderColor};
  background-color: ${props => (props.$color === 'white' ? '#f0f0f0' : '#333')};
`;

export const StartGameButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.success};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.successHover};
    transform: translateY(-2px);
  }
`;
