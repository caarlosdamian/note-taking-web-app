'use server';

import { genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  console.log('password', password);
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const passwordHashed = await hash(password, salt);
  return passwordHashed;
};
