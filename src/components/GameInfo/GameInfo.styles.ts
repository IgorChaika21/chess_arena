import styled from 'styled-components';

import { media } from '@/styles/breakpoints';

export const GameInfoContainer = styled.div`
  background-color: ${props => props.theme.rightBgColor};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  gap: 20px;

  ${media.sm} {
    padding: 16px;
    gap: 16px;
  }
`;

export const GameTitle = styled.h2`
  text-align: center;
  margin: 0;
  color: ${props => props.theme.textColor};
  font-size: 1.8rem;
  font-weight: 700;
  padding-bottom: 16px;
  border-bottom: 2px solid ${props => props.theme.borderColor};
  flex-shrink: 0;

  ${media.sm} {
    font-size: 1.5rem;
    padding-bottom: 12px;
  }
`;

export const GameTitleIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  vertical-align: middle;
`;
