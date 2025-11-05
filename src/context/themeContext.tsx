'use client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export type ThemeType = 'dark' | 'light' | 'system';
interface themeContextI {
  isDarkMode: boolean;
  selectedTheme: string;

  setIsDarkMode: Dispatch<
    SetStateAction<{
      isDarkMode: boolean;
      selectedTheme: string;
    }>
  >;
  handleThemeChange: (s: ThemeType) => void;
}

export const themeContext = createContext<themeContextI>({
  isDarkMode: false,
  selectedTheme: '',
  setIsDarkMode: () => {},
  handleThemeChange: () => {},
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [{ isDarkMode, selectedTheme }, setIsDarkMode] = useState({
    isDarkMode: false,
    selectedTheme: 'dark',
  });

  useEffect(() => {
    if (window) {
      const prefersLightTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );

      setIsDarkMode(() => ({
        isDarkMode: prefersLightTheme.matches,
        selectedTheme: 'system',
      }));
    }
  }, []);

  const handleThemeChange = (theme: ThemeType) => {
    const prefersLightTheme = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(() => ({
      isDarkMode:
        theme === 'dark' || (theme === 'system' && prefersLightTheme.matches)
          ? true
          : false,
      selectedTheme: theme,
    }));
  };

  return (
    <themeContext.Provider
      value={{ isDarkMode, setIsDarkMode, handleThemeChange, selectedTheme }}
    >
      <div className={`${isDarkMode ? 'dark' : ''}`}>{children}</div>
    </themeContext.Provider>
  );
};
