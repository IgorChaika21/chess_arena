import styled from 'styled-components';

import { media } from '@/styles/breakpoints';

export const Section = styled.section`
  background: ${props => props.theme.sectionBg};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.borderColor};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${media.sm} {
    padding: 16px;
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: 24px;
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;

  ${media.sm} {
    margin-bottom: 16px;
  }
`;

export const Button = styled.button<{
  variant?: 'primary' | 'danger' | 'success';
}>`
  background-color: ${props =>
    props.variant === 'primary'
      ? props.theme.buttonPrimary
      : props.variant === 'danger'
        ? props.theme.buttonDanger
        : props.variant === 'success'
          ? props.theme.success
          : props.theme.buttonBg};
  color: ${props =>
    ['primary', 'danger', 'success'].includes(props.variant || '')
      ? 'white'
      : props.theme.textColor};
  border: none;
  border-radius: 6px;
  padding: 12px 16px;
  margin: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${props =>
      props.variant === 'primary'
        ? props.theme.buttonPrimary + 'dd'
        : props.variant === 'danger'
          ? props.theme.buttonDanger + 'dd'
          : props.variant === 'success'
            ? '#45a049'
            : props.theme.buttonHover};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${props => props.theme.buttonBg + '80'};
    color: ${props => props.theme.textColor + '80'};
    cursor: not-allowed;
    transform: none;
  }

  ${media.sm} {
    width: 100%;
    margin: 4px 0;
  }
`;
