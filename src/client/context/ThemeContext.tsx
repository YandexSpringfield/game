import React, { FC, createContext, useState, useEffect, useMemo } from 'react';
import { TThemeContext, Theme } from '@context/types';

export const ThemeContext = createContext<TThemeContext>({
  theme: Theme.light,
  updateTheme: () => {},
});

export const ThemeProvider: FC<React.ReactNode> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.light);

  const updateTheme = () => {
    setTheme(theme === Theme.light ? Theme.dark : Theme.light);
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
