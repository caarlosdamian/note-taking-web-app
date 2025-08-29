'use client';
import { themeContext } from '@/src/context';
import Image from 'next/image';
import React, { use } from 'react';

export const Logo = () => {
  const { isDarkMode } = use(themeContext);
  return (
    <Image
      src={
        isDarkMode
          ? './assets/images/logo-dark.svg'
          : './assets/images/logo.svg'
      }
      alt="logo"
      width={95}
      height={28}
    />
  );
};
