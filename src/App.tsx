import { ThemeProvider } from 'styled-components';

import AppLayout from '@/components/AppLayout/AppLayout';
import { useTheme } from '@/hooks/theme/useTheme';
import { GlobalStyles } from '@/styles/GlobalStyles';

function App() {
  const { currentTheme } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
