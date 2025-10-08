import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    sectionBg: string;
    borderColor: string;
    buttonBg: string;
    buttonHover: string;
    buttonDanger: string;
    chessLightSquare: string;
    chessDarkSquare: string;
    chessSelected: string;
    successHover?: string;
    borderColor: string;
    focusColor?: string;
  }
}
