import styled from 'styled-components';

export const PromotionModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const PromotionOptions = styled.div`
  background-color: #f0d9b5;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export const PromotionTitle = styled.h3`
  margin-top: 0;
  color: #5a3921;
`;

export const PromotionButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background-color: #b58863;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #8c6e56;
  }
`;
