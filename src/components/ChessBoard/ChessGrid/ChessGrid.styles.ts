import styled from 'styled-components';

export const ChessBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border: 2px solid #333;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

export const BoardGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
`;

export const ColumnLabels = styled.div`
  display: flex;
  background-color: #b58863;
  border-bottom: 2px solid #333;
  padding: 5px 0;
`;

export const RowLabels = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b58863;
  border-right: 2px solid #333;
  padding: 0 5px;
`;

export const NotationLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5a3921;
  font-weight: bold;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  user-select: none;
  flex: 1;
`;
