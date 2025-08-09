'use client'
import Image from 'next/image';
import { use } from 'react';
import { themeContext } from '../context';

export const Header = () => {
  const {isDarkMode} = use(themeContext)

  return (
    <nav className="dark:bg-custom-neutral-800 bg-custom-neutral-100 h-[54px]  md:h-[74px] py-[13px] px-4 md:py-[23px] md:px-8">
      <Image
        src={isDarkMode ? "./assets/images/logo-dark.svg":"./assets/images/logo.svg" }
        alt="logo"
        width={95}
        height={28}
      />
    </nav>
  );
};
