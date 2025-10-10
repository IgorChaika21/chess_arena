import React from 'react';

import { useTheme } from '@/hooks/theme/useTheme';

import { ThemeToggleButton, IconWrapper } from './ThemeSwitcher.styles';

const ThemeSwitcher: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <ThemeToggleButton
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Light mode' : 'Dark mode'}
    >
      <IconWrapper>{darkMode ? '☀️' : '🌙'}</IconWrapper>
      <span>{darkMode ? 'Light' : 'Dark'}</span>
    </ThemeToggleButton>
  );
};

export default ThemeSwitcher;
