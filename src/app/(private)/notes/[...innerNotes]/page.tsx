import { getNotes } from '@/src/actions/notes';
import { ActionBar, Note, NoteLayout } from '@/src/components';
import React from 'react';

const NotesPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ slug: string }>;
}) => {
  const testing = await searchParams;
  const prueba = await params;
  const notes = await getNotes({});

  return (
    <section className="flex w-full h-full">
      <NoteLayout notes={notes as string} />
      <Note />
      <ActionBar />
    </section>
  );
};

export default NotesPage;
