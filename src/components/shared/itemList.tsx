'use client';
import { IconList, isActive } from '@/src/utils';
import { Icon } from '../icon';
import { usePathname } from 'next/navigation';
import { themeContext } from '@/src/context';
import { use } from 'react';
import Link from 'next/link';

interface Props {
  label: string;
  icon: IconList;
  path: string;
  isNavegation?: Boolean;
}

export const ItemList = ({ icon, label, path, isNavegation }: Props) => {
  const pathname = usePathname();
  const { isDarkMode } = use(themeContext);
  return (
    <li className={`${isActive(pathname, path) ? 'dark:bg-custom-neutral-700 bg-custom-neutral-200' : ''} p-3 rounded-lg`}>
      <Link href={path} className='flex items-center gap-2'>
        <Icon
          icon={icon}
          color={
            isActive(pathname, path)
              ? '#335CFF'
              : isDarkMode
              ? '#99A0AE'
              : '#525866'
          }
        />
        <span className="font-preset-4 text-neutral-950 dark:text-white">
          {label}
        </span>
      </Link>
    </li>
  );
};
