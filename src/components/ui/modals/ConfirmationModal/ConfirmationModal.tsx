import React from 'react';

import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalMessage,
  ModalActions,
  ModalButton,
} from './ConfirmationModal.styles';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = props => {
  const {
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Yes',
    cancelText = 'Cancel',
  } = props;

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalActions>
          <ModalButton $variant="cancel" onClick={onCancel}>
            {cancelText}
          </ModalButton>
          <ModalButton $variant="confirm" onClick={onConfirm}>
            {confirmText}
          </ModalButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
