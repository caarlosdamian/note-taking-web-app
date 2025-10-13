'use client';
import React from 'react';
import { Notes } from '../sidebar/notes';
import { Note } from '@/src/types';
import { useRouter } from 'next/navigation';
import { createNote } from '@/src/actions/notes';
import { IconList } from '@/src/utils';

interface Props {
  action?: () => void;
  btnLabel?: string;
  btnIcon?: IconList;
  emptyNote?: string;
  upperNote?: string;
  notes: Note[] | string;
  redirect?: boolean;
  className?: string;
}

export const NoteLayout = ({ className, notes, upperNote }: Props) => {
  const router = useRouter();
  const addNewNote = async () => {
    const newNote = await createNote({ title: '', content: '' });
    const noteId = JSON.parse(newNote as string);
    router.push(`/notes/${noteId._id}`);
  };

  return (
    <Notes
      redirect
      notes={typeof notes === 'string' ? JSON.parse(notes) : (notes as Note[])}
      btnLabel="Create New Note"
      btnIcon="plus"
      upperNote={upperNote}
      action={addNewNote}
      className={className}
    />
  );
};
