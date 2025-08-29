import React from 'react';
import { Logo } from './shared/logo';

export const Header = () => (
  <nav className="dark:bg-custom-neutral-800 bg-custom-neutral-100 h-[54px]  md:h-[74px] py-[13px] px-4 md:py-[23px] md:px-8">
    <div className="lg:hidden">
      <Logo />
    </div>
    <div className="hidden lg:block">
      <span className='font-preset-1 text-neutral-950 dark:text-white'>All notes</span>
    </div>
  </nav>
);
