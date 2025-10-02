import React from 'react';
import styled from 'styled-components';

import { useTheme } from '@/hooks/useTheme';

const ThemeToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.borderColor};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  cursor: pointer;
  color: ${props => props.theme.textColor};
  z-index: 1000;
`;

const ThemeSwitcher: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <ThemeToggleButton onClick={toggleTheme}>
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </ThemeToggleButton>
  );
};

export default ThemeSwitcher;
