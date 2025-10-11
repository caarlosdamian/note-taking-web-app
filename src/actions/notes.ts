'use server';

import { auth } from '@/auth';
import dbConnect from '../lib/connectDB';
import Note from '../models/note';
import { getUser } from './auth';
import { GetNoteParams, UpdateNoteParams } from '../types';
import { addNoteToTag, createTag, getTag, removeNoteFromTag } from './tags';
// todo: solo notas del usuario
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
    const note = await Note.findById(noteId).populate({ path: 'tags' });

    const noteString = JSON.stringify(note);

    return noteString;
  } catch (error) {
    console.error(error);
  }
};

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
  // userId,
  noteInfo,
}: UpdateNoteParams) => {
  try {
    let tagsIds = [];

    const tagIdsToRemove = noteInfo.tags
      .filter((element) => !body.tags.includes(element.name))
      .map((el) => el._id);

    if (body.tags) {
      const tags = body.tags.split(',');
      for (const tag of tags) {
        const dbTag = await getTag(tag);
        if (dbTag) {
          tagsIds.push(dbTag._id);
          await addNoteToTag({ noteId, tagId: dbTag._id });
        } else {
          const newTag = await createTag({ name: tag, noteId });
          tagsIds.push(newTag._id);
        }
      }
    }

    if (tagIdsToRemove.length > 0) {
      for (const tag of tagIdsToRemove) {
        await removeNoteFromTag({ noteId, tagId: tag });
      }
      await Note.findByIdAndUpdate(noteId, {
        $pull: { tags: { $in: tagIdsToRemove } },
      });
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
