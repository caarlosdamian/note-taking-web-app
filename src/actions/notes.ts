'use server';

import { auth } from '@/auth';
import dbConnect from '../lib/connectDB';
import Note from '../models/note';
import { getUser } from './auth';
import { notes } from '../utils';

// todo: parametros

export const getNotes = async () => {
  try {
    await dbConnect();
    const notes = await  Note.find({}).lean();

    const testing = JSON.stringify(notes)

    return testing;
  } catch (error) {
    console.error(error);
  }
};

// todo: match correct typing
export const createNote = async (body: any) => {
  try {
    // todo: creat auth agregar id en el session
    const {
      user: { email },
    } = (await auth()) as { user: { email: string } };
    const user = await getUser(email);
    // console.log('session', session);
    console.log('body', body);
    await dbConnect();
    const note = await Note.create({ user_id: user._id, ...body });
    console.log('note', note);
    return note;
  } catch (error) {
    console.error(error);
  }
};
