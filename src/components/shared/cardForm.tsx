'use client';
import React from 'react';
import { Button, Logo, TextInput } from '..';
import { InputItem } from '@/src/types';
import { PasswordInput } from './passwordInput';
import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
// import { formActionsByType } from '@/src/utils';

interface Props {
  title: string;
  subtitle: string;
  formItems: InputItem[];
  actionLabel: string;
  className?: string;
  isLoginOrSingup?: boolean;
  type: 'password' | 'resetPassword' | 'signin' | 'signup';
}
// todo : reset password / forgot password

export const CardForm = ({
  subtitle,
  title,
  formItems,
  actionLabel,
  className,
  type,
  isLoginOrSingup = false,
}: Props) => {
  const pathName = usePathname();

  const formActionsByType = {
    password: {
      action: (values: FormData) => console.log(values),
      // signIn('credentials', { ...values, type: 'signup' }, {}),
    },
    resetPassword: {
      action: (values: FormData) => console.log(values),
      // signIn('credentials', { ...values, type: 'signup' }, {}),
    },
    signin: {
      action: async (values: FormData) =>
        signIn('credentials', { ...values, type: 'signin' }, {}),
    },
    signup: {
      action: async (values: FormData) =>
        signIn('credentials', { ...values, type: 'signup' }, {}),
    },
  };

  return (
    <div
      className={`rounded-[12px] border border-custom-neutral-200 dark:border-custom-neutral-800 bg-white dark:bg-custom-neutral-950 shadow-lg w-full h-fit py-12 px-4 flex flex-col gap-6 items-center md:px-12 ${className}`}
    >
      <Logo />
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="font-preset-1 text-custom-neutral-950 dark:text-white">
          {title}
        </h1>
        <p className="font-preset-5 text-custom-neutral-950  dark:text-custom-neutral-300 text-center">
          {subtitle}
        </p>
      </div>
      <form
        className="flex flex-col gap-4 mt-4 self-stretch"
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const values = Object.fromEntries(
            formData.entries()
          ) as unknown as FormData;
          // todo reutilizable usar prop
          await formActionsByType[type].action(values);
        }}
      >
        {/*  adapt depending on the situation */}
        <input type="hidden" name="redirectTo" value="/" />

        {formItems.map((input) => {
          if (input?.type === 'password') {
            return (
              <PasswordInput key={input.name} {...input} className="w-full" />
            );
          }
          return <TextInput key={input.name} {...input} className="w-full" />;
        })}
        <Button variant="primary" className="w-full justify-center text-center">
          {actionLabel}
        </Button>
      </form>
      {isLoginOrSingup && (
        <div className="flex flex-col gap-4  items-center self-stretch">
          <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px] w-full" />

          <p className="font-preset-5 text-custom-neutral-950  dark:text-custom-neutral-300">
            Or log in with:
          </p>

          <Button
            variant="border"
            icon="google"
            iconSize={{ width: 16, height: 16 }}
            className="w-full justify-center text-center dark:border-custom-neutral-600 text-custom-neutral-950  dark:text-custom-neutral-300"
          >
            Google
          </Button>
          <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px] w-full" />

          <p className="font-preset-5 text-custom-neutral-950  dark:text-custom-neutral-300 hover:bg-none">
            {pathName.split('/')[1] === 'signin'
              ? 'No account yet? '
              : 'Already have an account? '}

            {pathName.split('/')[1] === 'signin' ? (
              <Link href="/signup">
                <strong>Sign Up</strong>
              </Link>
            ) : (
              <Link href="/signin">
                <strong>Login</strong>
              </Link>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
