'use client';
import React from 'react';
import { Notes } from '../sidebar/notes';
import { Note } from '@/src/types';
import { useRouter } from 'next/navigation';
import { createNote } from '@/src/actions/notes';

export const NoteLayout = ({
  className,
  notes,
}: {
  className?: string;
  notes: any;
}) => {
  const router = useRouter();
  const addNewNote = async () => {
    const newNote = await createNote({ title: '', content: '' });
    // todo: maybe pathname si lo necesitamos diferentes rutas
    router.push(`/notes/${newNote._id}`);
  };

  return (
    <Notes
      redirect
      notes={typeof notes === 'string' ? JSON.parse(notes) : (notes as Note[])}
      btnLabel="Create New Note"
      btnIcon="plus"
      upperNote="All notes with the ”Dev” tag are shown here."
      action={addNewNote}
      className={className}
    />
  );
};
