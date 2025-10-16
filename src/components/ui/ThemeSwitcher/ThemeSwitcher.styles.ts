import styled from 'styled-components';

import { media } from '@/styles/breakpoints';

export const ThemeToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 3rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.buttonBg};
  border: 2px solid ${props => props.theme.borderColor || 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.lg} {
    top: 0.5rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 12px;
  }

  ${media.sm} {
    position: fixed;
    top: auto;
    bottom: 1rem;
    right: 1rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    padding: 0;
    justify-content: center;
  }
`;

export const IconWrapper = styled.span`
  font-size: 16px;

  ${media.sm} {
    font-size: 20px;
  }
`;

export const TextWrapper = styled.span`
  ${media.sm} {
    display: none;
  }
`;
