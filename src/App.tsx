import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { useTheme } from '@/hooks/useTheme';
import { GlobalStyles } from '@/styles/GlobalStyles';

import ChessBoard from './components/ChessBoard/ChessBoard';
import GameInfo from './components/GameInfo/GameInfo';
import ThemeSwitcher from './components/ui/ThemeSwitcher/ThemeSwitcher';

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
  width: 380px;
  padding: 24px;
  background-color: ${props => props.theme.bgColor};
  border-left: 1px solid ${props => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
