import React from 'react';
import { Logo, TextInput } from '..';
import { InputItem } from '@/src/types';
import { PasswordInput } from './passwordInput';

interface FormItem {
  label: string;
  name: string;
}

interface Props {
  title: string;
  subtitle: string;
  formItems: InputItem[];
}

export const CardForm = ({ subtitle, title, formItems }: Props) => {
  return (
    <div className="rounded-[12px] border border-custom-neutral-200 dark:border-custom-neutral-800 bg-white dark:bg-custom-neutral-950 shadow-lg w-full h-fit py-12 px-4 flex flex-col gap-6 items-center">
      <Logo />
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="font-preset-1 text-custom-neutral-950 dark:text-white">
          {title}
        </h1>
        <p className="font-preset-5 text-custom-neutral-950  dark:text-custom-neutral-300">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4 self-stretch">
        {formItems.map((input) => {
          if (input?.type === 'password') {
            return <PasswordInput {...input} className="w-full" />;
          }
          return <TextInput {...input} className="w-full" />;
        })}
      </div>
    </div>
  );
};
