'use client';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface themeContextI {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<boolean>;
}

export const themeContext = createContext<themeContextI>({
  isDarkMode: false,
  setIsDarkMode: function (value: boolean): void {
    throw new Error('Function not implemented.');
  },
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window) {
      const prefersLightTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );

      if (prefersLightTheme.matches) {
        setIsDarkMode(true);
        return;
      }
    }
  }, []);

  return (
    <themeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div className={`${isDarkMode ? 'dark' : ''}`}>{children}</div>
    </themeContext.Provider>
  );
};
