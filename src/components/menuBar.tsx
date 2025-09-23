'use client';
import React, { use, useMemo } from 'react';
import { Icon } from './icon';
import { IconList, isActive } from '../utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { themeContext } from '../context';

type MenuElement = {
  label: string;
  icon: string;
  path: string;
};

interface Props {
  elements: MenuElement[];
}
export const MenuBar = ({ elements }: Props) => {
  const pathname = usePathname();
  const { isDarkMode } = use(themeContext);

  return (
    <div className="flex justify-center px-8 py-3 bg-white dark:bg-custom-neutral-950 border-t-[1px] border-custom-neutral-200 dark:border-custom-neutral-800 shadow-[0_-4px_6px_0_rgba(240,240,240,0.6)] dark:shadow-[0_-5px_6px_0_rgba(0,0,0,0.5)] md:gap-9 lg:hidden z-10">
      {elements.map((item, index) => (
        <React.Fragment key={item.path}>
          <Link
            href={item.path}
            className={`flex flex-col items-center gap-1 min-w-[68px] md:w-[100px] rounded-sm py-1 cursor-pointer ${
              isActive(pathname, item.path)
                ? 'bg-custom-blue-50 dark:bg-neutral-700'
                : ''
            }`}
          >
            <Icon
              color={
                isActive(pathname, item.path)
                  ? '#335CFF'
                  : isDarkMode
                  ? '#99A0AE'
                  : '#525866'
              }
              icon={item.icon as IconList}
              width={24}
              height={24}
            />
            <span
              className={`hidden md:block font-preset-6 ${
                isActive(pathname, item.path)
                  ? 'text-custom-blue-500'
                  : 'text-custom-neutral-400'
              }`}
            >
              {item.label}
            </span>
          </Link>
          {index !== elements.length - 1 && (
            <div className="hidden md:block w-[1px] bg-custom-neutral-100 dark:bg-neutral-800" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
