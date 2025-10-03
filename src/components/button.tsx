'use client';
import React, { ButtonHTMLAttributes, PropsWithChildren, use } from 'react';
import { Icon } from './icon';
import { IconList } from '../utils';
import { themeContext } from '../context';

export type BtnVariant = 'primary' | 'secondary' | 'border' | 'danger' | 'link';
interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  icon?: IconList;
  variant: BtnVariant;
  iconSize?: { width: number; height: number };
}

export const Button = ({
  variant,
  children,
  icon,
  iconSize,
  ...props
}: Props) => {
  const { isDarkMode } = use(themeContext);

  const variantStyles = {
    primary: 'bg-custom-blue-500 text-white hover:bg-custom-blue-700',
    secondary:
      'bg-custom-neutral-100 text-neutral-600  border-[1px] hover:border-[1px] border-transparent hover:border-neutral-300 hover:text-custom-neutral-950 dark:bg-custom-neutral-500 dark:text-custom-neutral-200 dark:hover:bg-white',
    border:
      'hover:text-neutral-600 hover:bg-custom-neutral-100 border-[1px] border-neutral-300 text-custom-neutral-950',
    danger: 'bg-custom-red-500 text-white hover:bg-custom-red-500/80',
    link: '!px-0 !py-0 dark:text-custom-neutral-300 text-custom-neutral-950',
  };

  return (
    <button
      {...props}
      className={`focus:outline-2 focus:outline-offset-4
   focus:outline-custom-neutral-400 cursor-pointer rounded-lg w-fit font-preset-4 
    disabled:bg-custom-neutral-50 disabled:text-neutral-300
    px-4 py-3.5 flex gap-1 items-center ${variantStyles[variant]} ${props.className}
    `}
    >
      {icon && (
        <Icon
        // className='hover:cutto'
          color={isDarkMode ? '#fff' : '#0E121B'}
          icon={icon}
          width={iconSize?.width || 14}
          height={iconSize?.height || 14}
        />
      )}
      {children}
    </button>
  );
};
