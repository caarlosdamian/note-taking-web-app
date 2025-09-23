'use client';
import React, { use } from 'react';
import { Notes } from '../sidebar/notes';
import { noteContext } from '@/src/context';
import { Note } from '@/src/types';
import { useRouter } from 'next/navigation';

export const NoteLayout = ({ className }: { className?: string }) => {
  // tener un estado temporal para manejo de notas no guardadas

  // provider
  const router = useRouter();
  const { notes, createLocalNote } = use(noteContext);
  const addNewNote = () => {
    const newNote = createLocalNote() as unknown as Note;
    router.push(`/notes/${newNote.id}`);
  };

  return (
    <Notes
      redirect
      // todo maybe by props ?
      notes={notes as Note[]}
      btnLabel="Create New Note"
      btnIcon="plus"
      upperNote="All notes with the ”Dev” tag are shown here."
      action={addNewNote}
      className={className}
    />
  );
};
