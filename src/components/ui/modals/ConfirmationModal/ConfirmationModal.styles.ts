import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${props => props.theme.sectionBg};
  border: 2px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const ModalTitle = styled.h3`
  margin: 0 0 15px 0;
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ModalMessage = styled.p`
  margin: 0 0 20px 0;
  color: ${props => props.theme.textColor};
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ModalButton = styled.button<{ $variant?: 'confirm' | 'cancel' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;

  background-color: ${props =>
    props.$variant === 'confirm'
      ? props.theme.buttonDanger
      : props.theme.buttonBg};
  color: ${props =>
    props.$variant === 'confirm' ? 'white' : props.theme.textColor};

  &:hover {
    background-color: ${props =>
      props.$variant === 'confirm' ? '#c82333' : props.theme.buttonHover};
  }
`;
