export type TThemeContext = {
  theme: string;
  updateTheme: () => void;
};

export enum Theme {
  dark = 'dark',
  light = 'light',
}
