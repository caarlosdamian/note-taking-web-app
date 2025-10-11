'use server';

import { auth } from '@/auth';
import dbConnect from '../lib/connectDB';
import Note from '../models/note';
import { getUser } from './auth';
import { GetNoteParams, UpdateNoteParams } from '../types';
import { createTag, getTag } from './tags';

export const getNotes = async () => {
  try {
    await dbConnect();
    const notes = await Note.find({}).populate({ path: 'tags' }).lean();
    const testing = JSON.stringify(notes);

    return testing;
  } catch (error) {
    console.error(error);
  }
};

export const getNote = async ({ noteId }: GetNoteParams) => {
  try {
    await dbConnect();
    const note = await Note.findById(noteId);

    const noteString = JSON.stringify(note);

    return noteString;
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

    await dbConnect();
    const note = await Note.create({ user_id: user._id, ...body });
    return note;
  } catch (error) {
    console.error(error);
  }
};

export const updateNote = async ({
  body,
  noteId,
  userId,
}: UpdateNoteParams) => {
  try {
    let tagsIds = [];
    if (body.tags) {
      const tags = body.tags.split(',');
      for (const tag of tags) {
        const dbTag = await getTag(tag);
        if (dbTag) {
          tagsIds.push(dbTag._id);
        } else {
          const newTag = await createTag({ name: tag, noteId });
          tagsIds.push(newTag._id);
        }
      }
    }

    await dbConnect();
    const note = await Note.findByIdAndUpdate(
      noteId,
      {
        $set: {
          title: body.title,
          content: body.content,
        },
        $addToSet: {
          tags: { $each: tagsIds },
        },
      },
      { new: true }
    );

    return JSON.stringify(note);
  } catch (error) {
    console.error(error);
  }
};
