import styled from 'styled-components';

import { Colors } from '@/types/types';

import { SectionTitle } from '../sections.styles';

export const MovesHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
`;

export const StyledSectionTitle = styled(SectionTitle)`
  margin-bottom: 0;
`;

export const MovesCount = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.textColor}80;
  background-color: ${props => props.theme.rightBgColor};
  padding: 4px 8px;
  border-radius: 12px;
`;

export const MoveHistoryContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  background-color: ${props => props.theme.sectionBg};
  padding: 12px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.9rem;
  border: 1px solid ${props => props.theme.borderColor};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.borderColor};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.textColor}80;
  }
`;

export const MoveHistoryItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

export const MoveNumber = styled.span`
  color: ${props => props.theme.textColor}80;
  font-weight: 500;
`;

export const Move = styled.span<{ $color: Colors }>`
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${props =>
    props.$color === 'white'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'};
`;

export const NoMoves = styled.p`
  text-align: center;
  color: ${props => props.theme.textColor}80;
  font-style: italic;
  margin: 0;
  padding: 16px 0;
`;
