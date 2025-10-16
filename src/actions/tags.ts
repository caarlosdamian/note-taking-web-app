'use server';

import { error } from 'console';
import dbConnect from '../lib/connectDB';
import Tag from '../models/tag';
import { erroResponse } from '../utils';

export const createTag = async (body: { name: string; noteId: string }) => {
  try {
    const { name, noteId } = body;
    await dbConnect();
    const tag = await Tag.findOneAndUpdate(
      { name: name.trim().toLowerCase() },
      {
        $setOnInsert: { name: name.trim().toLowerCase() },
        $addToSet: { note_ids: noteId },
      },
      { new: true, upsert: true }
    );
    return tag;
  } catch (error) {
    console.log('error', error);
    return erroResponse(error as Error);
  }
};

export const getTag = async (name: string) => {
  try {
    await dbConnect();
    const tag = await Tag.findOne({ name });

    return tag;
  } catch (error) {
    erroResponse(error as Error);
  }
};

export const getTags = async () => {
  try {
    await dbConnect();
    const tags = await Tag.find().lean();
    const normalizeTags = JSON.stringify(tags);

    return normalizeTags;
  } catch (error) {
    erroResponse(error as Error);
  }
};

export const updateTag = async (body: { name: string; noteId: string }) => {
  try {
    const { name, noteId } = body;
    await dbConnect();
    const tag = await Tag.findOneAndUpdate(
      { name: name.trim().toLowerCase() },
      {
        $setOnInsert: { name: name.trim().toLowerCase() },
        $addToSet: { note_ids: noteId },
      },
      { new: true, upsert: true }
    );
    return tag;
  } catch (error) {
    console.log('error', error);
    return erroResponse(error as Error);
  }
};

export const removeNoteFromTag = async (body: {
  noteId: string;
  tagId: string;
}) => {
  try {
    const { noteId, tagId } = body;
    await dbConnect();
    const tag = await Tag.findByIdAndUpdate(tagId, {
      $pull: { note_ids: noteId },
    });
    return tag;
  } catch (error) {
    console.log('error', error);
    return erroResponse(error as Error);
  }
};

export const addNoteToTag = async (body: { noteId: string; tagId: string }) => {
  try {
    const { noteId, tagId } = body;
    await dbConnect();
    const tag = await Tag.findByIdAndUpdate(tagId, {
      $addToSet: { note_ids: noteId },
    });
    return tag;
  } catch (error) {
    console.log('error', error);
    return erroResponse(error as Error);
  }
};
