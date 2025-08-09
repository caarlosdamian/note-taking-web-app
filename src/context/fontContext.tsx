'use client';
import { Inter, Noto_Serif, Source_Code_Pro } from 'next/font/google';
import { createContext, PropsWithChildren, useState } from 'react';

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
const fontContext = createContext({});

export const FontContextProvider = ({ children }: PropsWithChildren) => {

  const [font, setFont] = useState(inter.className);

  return (
    <fontContext.Provider
      value={{
        font,
        setFont,
      }}
    >
      <main className={font}>{children}</main>
    </fontContext.Provider>
  );
};
