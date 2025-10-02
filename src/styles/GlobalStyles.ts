import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.bgColor};
    margin: 0;
    font-family: "Marcellus", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease;
  }

  #root {
    max-width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
    color: ${props => props.theme.textColor};
    font-family: "Marcellus", serif;
  }

  button {
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
  }
`;
