'use client';
import { IconList, isActive } from '@/src/utils';
import { Icon } from '../icon';
import { usePathname } from 'next/navigation';
import { themeContext } from '@/src/context';
import { use } from 'react';
import Link from 'next/link';

export interface ItemListI {
  label: string;
  icon: IconList;
  path: string;
  isNavegation?: Boolean;
  keywords: string[];
  withBorder?: boolean;
}

export const ItemList = ({
  icon,
  label,
  path,
  isNavegation,
  keywords,
  withBorder,
}: ItemListI) => {
  const pathname = usePathname();
  const { isDarkMode } = use(themeContext);
  return (
    <li
      className={`${
        isActive(pathname, keywords)
          ? 'dark:bg-custom-neutral-700 bg-custom-neutral-200'
          : ''
      } p-3 ${
        withBorder
          ? 'border-b-custom-neutral-200 dark:border-b-custom-neutral-800 border-b-[1px]'
          : 'rounded-lg'
      }`}
    >
      <Link href={path} className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Icon
            icon={icon}
            color={
              isActive(pathname, keywords)
                ? '#335CFF'
                : isDarkMode
                ? '#99A0AE'
                : '#525866'
            }
          />
          <span className="font-preset-4 text-custom-neutral-950 dark:text-white capitalize">
            {label}
          </span>
        </div>
        {isActive(pathname, keywords) && (
          <Icon
            icon="arrowLeft"
            className="rotate-180"
            color={isDarkMode ? '#99A0AE' : '#525866'}
          />
        )}
      </Link>
    </li>
  );
};
