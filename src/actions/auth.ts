'use server';

import dbConnect from '../lib/connectDB';
import user from '../models/user';
import User from '../models/user';

// import { signIn } from 'next-auth/react';

// export const loginAction = async (formData: FormData) => {
//   try {
//     await ;
//   } catch (error) {
//     // if (error instanceof AuthError) {
//     //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
//     // }
//     throw error;
//   }
// };

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
    console.log('creando user');
    await dbConnect();
    const user = await User.create({ ...values, name: 'tesing' });
    console.log('entrandonad', user);
    return user;
  } catch (error) {
    console.log(error);
  }
};
