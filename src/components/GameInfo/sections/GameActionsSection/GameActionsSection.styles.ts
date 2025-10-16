import styled from 'styled-components';

import { media } from '@/styles/breakpoints';

import { Button } from '../sections.styles';

export const GameActionsContainer = styled.div`
  display: flex;
  gap: 12px;

  ${media.sm} {
    flex-direction: column;
  }
`;

export const ResignButton = styled(Button)`
  width: 100%;
  background-color: ${props => props.theme.buttonDanger};
  color: white;

  &:hover {
    background-color: ${props => props.theme.buttonDanger}dd;
  }
`;

export const ResetButton = styled(Button)`
  width: 100%;
  background-color: ${props => props.theme.success};
  color: white;

  &:hover {
    background-color: ${props => props.theme.successHover};
  }
`;
