'use server';

import console from 'console';
import dbConnect from '../lib/connectDB';

export const checkDBConnection = async () => {
  try {
    await dbConnect();
    console.log('Connected to db')
  } catch (error) {
    console.log(error)
  }
};
