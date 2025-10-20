'use server';

import { auth } from '@/auth';
import dbConnect from '../lib/connectDB';
import Note from '../models/note';
import { getUser } from './auth';
import {
  ArchiveNoteParams,
  DeleteNoteParams,
  GetNoteParams,
  GetNotesParams,
  INote,
  UpdateNoteParams,
} from '../types';
import { addNoteToTag, createTag, getTag, removeNoteFromTag } from './tags';
import { redirect } from 'next/navigation';
import { FilterQuery, mongo } from 'mongoose';
// todo: solo notas del usuario

export const getNotes = async (params: GetNotesParams) => {

  const { isArchived, q, tagName } = params;
  try {
    const searchQuery: FilterQuery<typeof Note> = {};

    if (tagName) {
      const tag = await getTag(tagName);
      searchQuery.tags = new mongo.ObjectId(tag._id);
    }

    if (typeof isArchived === 'boolean') {
      searchQuery.isArchived = isArchived;
    }

    if (q) {
      searchQuery.title = { $regex: q, $options: 'i' };
    }


    await dbConnect();
    const notes = await Note.find({ ...searchQuery })
      .populate({ path: 'tags' })
      .lean();


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

    return JSON.stringify(note);
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
      ?.filter((element) => !body.tags.includes(element.name))
      ?.map((el) => el._id);

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

export const deleteNote = async ({ noteId, noteInfo }: DeleteNoteParams) => {
  try {
    await dbConnect();
    let noteInfoDB;

    if (!noteInfo) {
      const note = await getNote({ noteId });
      noteInfoDB = JSON.parse(note as string);
    }

    const { tags } = noteInfo || (noteInfoDB as INote);

    if (tags.length > 0) {
      const tagsPromises = tags.map((ele) =>
        removeNoteFromTag({ noteId, tagId: ele._id })
      );
      await Promise.all(tagsPromises);
    }
    await Note.findByIdAndDelete(noteId);
  } catch (error) {
    console.log('error', error);
  }
  redirect('/notes');
};

export const archiveNote = async ({
  noteId,
  path,
  noteInfo,
  forceValue,
}: ArchiveNoteParams) => {
  try {
    await dbConnect();
    await Note.findByIdAndUpdate(
      noteId,
      {
        $set: {
          isArchived: noteInfo ? !noteInfo.isArchived : forceValue,
        },
      },
      { new: true }
    );
    // todo: maybe mandar a otro url dependiendo de si esta archivada o no
  } catch (error) {
    console.error(error);
  }

  redirect(path);
};
