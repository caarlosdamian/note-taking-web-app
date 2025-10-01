'use client';
import { InputItem } from '@/src/types';
import React, { useState } from 'react';
import { TextInput } from '../textInput';

export const PasswordInput = ({ ...rest }: InputItem) => {
  const [show, setShow] = useState({
    type: 'password',
    show: false,
  });

  const handleShowPassword = () => {
    setShow((prev) => ({
      show: !prev.show,
      type: prev.type === 'password' ? 'text' : 'password',
    }));
  };

  return (
    <TextInput
      {...rest}
      iconRight={show ? 'hidePassword' : 'showPassword'}
      iconActions={{ iconRight: { fn: () => handleShowPassword() } }}
      type={show.type}
    />
  );
};
