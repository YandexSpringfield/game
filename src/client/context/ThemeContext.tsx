import React, { FC, createContext, useState, useEffect, useMemo } from 'react';
import { TThemeContext } from '@context/types';
import { Theme } from '@types';

export const ThemeContext = createContext<TThemeContext>({
  theme: Theme.Light,
  updateTheme: () => {},
});

export const ThemeProvider: FC<React.ReactNode> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.Light);

  const updateTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    document.body.setAttribute('theme', theme);
  };

  useEffect(() => {
    document.body.setAttribute('theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, updateTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
