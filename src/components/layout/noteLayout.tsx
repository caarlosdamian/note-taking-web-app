'use client';
import React, { use } from 'react';
import { Notes } from '../sidebar/notes';
import { Note } from '@/src/types';
import { useRouter } from 'next/navigation';
import { createNote } from '@/src/actions/notes';
import { IconList } from '@/src/utils';
import { noteContext } from '@/src/context';

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

export const NoteLayout = ({ className, upperNote }: Props) => {
  // todo: quitar el contexto
  const {normalizeNotes} = use(noteContext)
  const router = useRouter();
  const addNewNote = async () => {
    const newNote = await createNote({ title: '', content: '' });
    const noteId = JSON.parse(newNote as string);
    router.push(`/notes/${noteId._id}`);
  };

  return (
    <Notes
      redirect
      notes={normalizeNotes as Note[]}
      btnLabel="Create New Note"
      btnIcon="plus"
      upperNote={upperNote}
      action={addNewNote}
      className={className}
    />
  );
};
