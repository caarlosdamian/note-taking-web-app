'use client';
import { Inter, Noto_Serif, Source_Code_Pro } from 'next/font/google';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { getConfig } from '../actions/user';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const noto = Noto_Serif({
  variable: '--font-noto',
  subsets: ['latin'],
});

const codePro = Source_Code_Pro({
  variable: '--font-code-pro',
  subsets: ['latin'],
});

export const fontContext = createContext({});

export const FontContextProvider = ({ children }: PropsWithChildren) => {
  const fonts = {
    codePro: codePro.className,
    noto: noto.className,
    inter: inter.className,
  };

  const [{ font, selectedKey }, setFont] = useState({
    font: fonts['inter'],
    selectedKey: 'inter',
  });

  const handleFontChange = (id: string) => {
    setFont(() => ({ font: fonts[id as keyof typeof fonts], selectedKey: id }));
  };

  const getInitialValue = async () => {
    const config = (await getConfig({ key: 'font' })) as string;
    handleFontChange(config);
  };

  useEffect(() => {
    getInitialValue();
  }, []);

  return (
    <fontContext.Provider
      value={{
        font,
        setFont,
        handleFontChange,
        selectedKey,
      }}
    >
      <main className={font}>{children}</main>
    </fontContext.Provider>
  );
};
