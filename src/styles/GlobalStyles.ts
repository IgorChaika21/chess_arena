import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #1a1a1a;
    margin: 0;
    font-family: "Marcellus", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    max-width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
    color: #f0f0f0;
    font-family: "Marcellus", serif;
  }

  button {
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
  }
`;