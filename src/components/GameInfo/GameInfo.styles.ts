import styled from 'styled-components';

export const GameInfoContainer = styled.div`
  background-color: ${props => props.theme.bgColor};
  border-radius: 12px;
  padding: 0;
  border: 1px solid ${props => props.theme.borderColor};
  min-width: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.div`
  background-color: ${props => props.theme.sectionBg};
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 0;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 16px;
  color: ${props => props.theme.textColor};
  font-size: 1.2rem;
`;

export const StatusText = styled.p<{
  $variant?: 'check' | 'checkmate' | 'stalemate';
}>`
  color: ${props => {
    switch (props.$variant) {
      case 'check':
        return '#ff9800';
      case 'checkmate':
        return '#f44336';
      case 'stalemate':
        return '#9e9e9e';
      default:
        return props.theme.textColor;
    }
  }};
  font-weight: ${props => (props.$variant ? 'bold' : 'normal')};
  margin: 8px 0;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: ${props => props.theme.borderColor};
  color: ${props => props.theme.textColor};
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.bgColor};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;
