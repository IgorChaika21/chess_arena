import { useGameStore } from '@/store/useGameStore';
import { lightTheme, darkTheme } from '@/styles/theme';

export const useTheme = () => {
  const { darkMode, toggleTheme } = useGameStore();
  const currentTheme = darkMode ? darkTheme : lightTheme;

  return { currentTheme, toggleTheme, darkMode };
};
