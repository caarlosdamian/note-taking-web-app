'use server';

import dbConnect from '../lib/connectDB';
import User from '../models/user';
import { genSalt, hash } from 'bcrypt';

const saltRounds = 10;

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
    const salt = await genSalt(saltRounds);
    const hashpassword = await hash(password, salt);
    await dbConnect();

    const user = await User.create({
      ...values,
      password: hashpassword,
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};
