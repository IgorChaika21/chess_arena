import React from 'react';

import { useTheme } from '@/hooks/theme/useTheme';

import {
  ThemeToggleButton,
  IconWrapper,
  TextWrapper,
} from './ThemeSwitcher.styles';

const ThemeSwitcher: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <ThemeToggleButton
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Light mode' : 'Dark mode'}
    >
      <IconWrapper>{darkMode ? '☀️' : '🌙'}</IconWrapper>
      <TextWrapper>{darkMode ? 'Light' : 'Dark'}</TextWrapper>
    </ThemeToggleButton>
  );
};

export default ThemeSwitcher;
