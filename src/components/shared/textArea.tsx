import React, { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  variant?: 'sm' | 'md' | 'lg';
}

export const TextArea = ({ ...rest }: Props) => {
  return (
    <textarea
      {...rest}
      className="dark:text-white outline-none w-full h-full"
    />
  );
};
