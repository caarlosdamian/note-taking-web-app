import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Icon } from './icon';
import { IconList } from '../utils';

export type BtnVariant = 'primary' | 'secondary' | 'border' | 'danger';
interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  icon?: IconList;
  variant: BtnVariant;
}

export const Button = ({ variant, children, icon, ...props }: Props) => {
  const variantStyles = {
    primary: 'bg-custom-blue-500 text-white hover:bg-custom-blue-700',
    secondary:
      'bg-custom-neutral-100 text-neutral-600  border-[1px] hover:border-[1px] border-transparent hover:border-neutral-300 hover:text-custom-neutral-950 dark:bg-custom-neutral-500 dark:text-custom-neutral-200 dark:hover:bg-white',
    border:
      'hover:text-neutral-600 hover:bg-custom-neutral-100 border-[1px] border-neutral-300 text-custom-neutral-950',
    danger: 'bg-custom-red-500 text-white hover:bg-custom-red-500/80',
  };

  return (
    <button
      {...props}
      className={`focus:outline-2 focus:outline-offset-4
   focus:outline-custom-neutral-400 cursor-pointer rounded-lg w-fit font-preset-4 
    disabled:bg-custom-neutral-50 disabled:text-neutral-300
    px-4 py-3.5 flex gap-1 items-center ${props.className}
        
    ${variantStyles[variant]}
    `}
    >
      {icon && <Icon color='fff' icon={icon} width={14} height={14} />}
      {children}
    </button>
  );
};
