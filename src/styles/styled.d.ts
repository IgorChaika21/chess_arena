import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    rightBgColor: string;
    textColor: string;
    sectionBg: string;
    borderColor: string;
    buttonBg: string;
    buttonHover: string;
    buttonPrimary: string;
    buttonDanger: string;
    chessLightSquare: string;
    chessDarkSquare: string;
    chessSelected: string;
    chessMoveOption: string;
    success?: string;
    successHover?: string;
    borderColor: string;
    focusColor?: string;
  }
}
