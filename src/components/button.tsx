import Image from 'next/image';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  icon?: string;
  variant: 'primary' | 'secondary' | 'border';
}

export const Button = ({ variant, children, icon, ...props }: Props) => {
  const variantStyles = {
    primary: 'bg-custom-blue-500 text-white hover:bg-custom-blue-700',
    secondary:
      'bg-custom-neutral-100 text-neutral-600  border-[1px] hover:border-[1px] border-transparent hover:border-neutral-300 hover:text-custom-neutral-950',
    border:
      'hover:text-neutral-600 hover:bg-custom-neutral-100 border-[1px] border-neutral-300 text-custom-neutral-950',
  };

  return (
    <button
      {...props}
      className={`focus:outline-2 focus:outline-offset-4
   focus:outline-custom-neutral-400 mt-4 cursor-pointer rounded-lg w-fit font-preset-4 
    disabled:bg-custom-neutral-50 disabled:text-neutral-300
    px-4 py-3.5 flex gap-3 items-center
        
    ${variantStyles[variant]}
    `}
    >
      {icon && <Image src={icon} width={14} height={14} alt="btn-icon" />}
      {children}
    </button>
  );
};
