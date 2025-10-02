import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    borderColor: string;
    chessLightSquare: string;
    chessDarkSquare: string;
    chessSelected: string;
  }
}
