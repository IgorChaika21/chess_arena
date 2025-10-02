import { ThemeProvider } from 'styled-components';

import ChessBoard from '@/components/ChessBoard/ChessBoard';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';
import { GlobalStyles } from '@/styles/GlobalStyles';

function App() {
  const { currentTheme } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <ThemeSwitcher />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <ChessBoard />
      </div>
    </ThemeProvider>
  );
}

export default App;
