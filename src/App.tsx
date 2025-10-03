import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { useTheme } from '@/hooks/useTheme';
import { GlobalStyles } from '@/styles/GlobalStyles';

import ChessBoard from './components/ChessBoard/ChessBoard';
import GameInfo from './components/GameInfo/GameInfo';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const BoardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;

const Sidebar = styled.div`
  width: 300px;
  padding: 20px;
  background-color: ${props => props.theme.bgColor};
  border-left: 1px solid ${props => props.theme.borderColor};
  display: flex;
  flex-direction: column;
`;

function App() {
  const { currentTheme } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <ThemeSwitcher />
      <AppContainer>
        <BoardContainer>
          <ChessBoard />
        </BoardContainer>
        <Sidebar>
          <GameInfo />
        </Sidebar>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
