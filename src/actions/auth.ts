'use server';

import dbConnect from '../lib/connectDB';
import User from '../models/user';
import { IUser } from '../types';
import { hashPassword } from '../utils';

export const getUser = async (email: string) => {
  try {
    await dbConnect();
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (values: {
  email: string;
  password: string;
}) => {
  try {
    const { password } = values;
    const hashpassword = await hashPassword(password);
    await dbConnect();

    const user = await User.create({
      ...values,
      resetPasswordCode: '',
      password: hashpassword,
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (values: IUser) => {
  try {
    const { email, ...rest } = values;
    let transformValues = { ...rest };
    const user = await getUser(email as string);
    if (!user) throw Error('no hay usuario');

    if ('password' in rest) {
      const hashedPassword = await hashPassword(rest.password as string);
      transformValues = { ...transformValues, password: hashedPassword };
    }

    await dbConnect();

    const newUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { ...transformValues } },
      { new: true }
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (values: {
  password: string;
  confirmPassword: string;
  code: string;
}) => {
  try {
    await dbConnect();
    const user = await User.findOne({ resetPasswordCode: values.code });
    if (!user) throw Error('no hay usuario');

    const newUser = await updateUser({
      email: user.email,
      password: values.password,
      resetPasswordCode: '',
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};
