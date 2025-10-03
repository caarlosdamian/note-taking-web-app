'use client';
import React, { use, useState } from 'react';
import { Icon } from './icon';
import { themeContext } from '../context';
import Link from 'next/link';
import { InputItem } from '../types';

interface Props extends InputItem {}

export const TextInput = ({
  label,
  id,
  name,
  iconLeft,
  iconRight,
  hint,
  error,
  linkLabel,
  linkUrl,
  variant = 'lg',
  className,
  iconActions,
  ...props
}: Props) => {
  const { isDarkMode } = use(themeContext);

  const variantStyles = {
    sm: 'px-1',
    md: 'p-2',
    lg: 'py-3 px-4',
  };
  const [inputValue, setInputValue] = useState(props.value || '');

  console.log(inputValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // todo addd un styled version
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        {label && (
          <label
            className="font-preset-4 text-neutral-950 dark:text-white"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        {linkLabel && linkUrl && (
          <Link
            href={linkUrl}
            className="font-preset-6 underline underline-offset-4"
          >
            {linkLabel}
          </Link>
        )}
      </div>
      <div className="relative">
        {iconLeft && (
          <Icon
            className="absolute left-4 top-4"
            color={`${isDarkMode ? 'fff' : '0E121B'}`}
            icon={iconLeft}
            width={20}
            height={20}
            onClick={() => {
              if (iconActions) {
                iconActions['iconLeft']?.fn && iconActions['iconLeft']?.fn();
              }
            }}
          />
        )}
        {iconRight && (
          <Icon
            className="absolute right-4 top-4"
            color={`${isDarkMode ? 'fff' : '0E121B'}`}
            icon={iconRight}
            width={20}
            height={20}
            onClick={() => {
              console.log('iconActions', iconActions);
              if (iconActions) {
                iconActions['iconRight']?.fn && iconActions['iconRight']?.fn();
              }
            }}
          />
        )}
        <input
          id={name}
          name={name}
          value={props.value || inputValue}
          className={`w-full border-[1px] text-custom-neutral-950 border-custom-neutral-600 rounded-lg outline-none  placeholder:font-preset-5 placeholder:text-custom-neutral-500 dark:bg-custom-neutral-950 active:outline-solid hover:bg-custom-neutral-50 dark:hover:bg-custom-neutral-800
  active:outline-custom-neutral-500 dark:active:outline-custom-neutral-600 dark:text-white outline-offset-2 disabled:bg-custom-neutral-50 disabled:text-custom-neutral-50 disable:placeholder:text-custom-neutral-50 disabled:cursor-not-allowed ${
    error ? 'border-custom-red-500' : ''
  } ${iconLeft ? 'pl-[44px]' : ''} ${iconRight ? 'pr-[44px]' : ''} ${
            variantStyles[variant]
          } ${className}`}
          {...props}
          {...{ onChange: props.onChange ? props.onChange : handleChange }}
          type={props.type || 'text'}
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
