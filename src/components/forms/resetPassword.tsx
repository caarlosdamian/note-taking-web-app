'use client';
import React, { use, useState } from 'react';
import { PasswordInput } from '../shared/passwordInput';
import { InputItem } from '@/src/types';
import { Button } from '../button';
import { changePassword } from '@/src/actions/auth';
import { toastContext } from '@/src/context';

export const ResetPassword = () => {
  const { addNewInstance } = use(toastContext);

  const formItems: InputItem[] = [
    {
      label: 'Old Password',
      name: 'oldPassword',
    },
    {
      label: 'New Password',
      name: 'password',
      hint: 'At least 8 characters',
    },
    {
      label: 'Confirm New Password',
      name: 'confirmPassword',
      equals: 'password',
    },
  ];

  const [formValues, setFormValues] = useState(() => {
    const values = formItems.reduce((acc, el) => {
      const { name } = el as { name: string };
      acc[name as keyof typeof acc] = '';
      return acc;
    }, {});
    return values;
  });

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: any
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries()) as unknown as {
      password: string;
      oldPassword: string;
    };
    // todo reutilizable usar prop
    const response = await changePassword({
      newPasword: values['password'],
      password: values['oldPassword'],
    });
    if (response.status === 'success') {
      setFormValues({
        confirmPassword: '',
        password: '',
        oldPassword: '',
      } as InputItem);
      addNewInstance({ id: 'password', title: 'Password Reset' });
    }
  };

  return (
    <form
      className="flex flex-col gap-4 mt-4 self-stretch"
      onSubmit={handleSubmit}
    >
      {formItems.map((input) => {
        return (
          <PasswordInput
            key={input.name}
            {...input}
            value={formValues[input.name as keyof typeof formValues]}
            className="w-full"
            onChange={(event) => {
              handleFormChange(event, input.error);
            }}
          />
        );
      })}
      <Button
        variant="primary"
        className=" justify-center text-center self-end"
      >
        Save Password
      </Button>
    </form>
  );
};
