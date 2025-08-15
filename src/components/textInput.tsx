'use client';
import Image from 'next/image';
import React, { InputHTMLAttributes, use } from 'react';
import { IconList } from '../utils';
import { Icon } from './icon';
import { themeContext } from '../context';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  iconLeft?: IconList;
  iconRight?: IconList;
  hint?: string;
  error?: string;
}

export const TextInput = ({
  label,
  id,
  name,
  iconLeft,
  iconRight,
  hint,
  error,
  ...props
}: Props) => {
  const { isDarkMode } = use(themeContext);
  return (
    <div className="m-2.5 flex flex-col gap-1.5 ">
      <label
        className="font-preset-4 text-neutral-950 dark:text-white"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative hover:bg-custom-neutral-50 dark:hover:bg-custom-neutral-800">
        {/* tailwwind group */}
        {iconLeft && (
          <Icon
            className="absolute left-4 top-4"
            color={`${isDarkMode ? 'fff' : '0E121B'}`}
            icon={iconLeft}
            width={20}
            height={20}
          />
        )}
        {iconRight && (
          <Icon
            className="absolute right-4 top-4"
            color={`${isDarkMode ? 'fff' : '0E121B'}`}
            icon={iconRight}
            width={20}
            height={20}
          />
        )}
        <input
          id={name}
          name={name}
          className={`w-full border-[1px] text-custom-neutral-950 border-custom-neutral-300 rounded-lg outline-none py-3 px-4 placeholder:font-preset-5 placeholder:text-custom-neutral-500 dark:bg-custom-neutral-950 focus:outline-solid
  focus:outline-custom-neutral-500 dark:focus:outline-custom-neutral-600 dark:text-white outline-offset-2 disabled:bg-custom-neutral-50 disabled:text-custom-neutral-50 disable:placeholder:text-custom-neutral-50 disabled:cursor-not-allowed ${
    error ? 'border-custom-red-500' : ''
  } ${iconLeft ? 'pl-[44px]' : ''} ${iconRight ? 'pr-[44px]' : ''}`}
          {...props}
          type="text"
        />
      </div>
      {hint && !error && (
        <div className="flex gap-2 items-center text-custom-neutral-600">
          <Icon color="525866" icon="info" width={20} height={20} />
          <span className="font-preset-6 ">{hint}</span>
        </div>
      )}
      {error && (
        <div className="flex gap-2 items-center text-custom-red-500">
          <Icon color="FB3748" icon="info" width={20} height={20} />
          <span className="font-preset-6 ">{error}</span>
        </div>
      )}
    </div>
  );
};
