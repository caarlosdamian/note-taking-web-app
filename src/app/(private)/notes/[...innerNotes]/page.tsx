import { getNotes } from '@/src/actions/notes';
import { ActionBar, Note, NoteLayout } from '@/src/components';
import { getIdAndArchivedFromParams } from '@/src/utils';
import React from 'react';

const NotesPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ innerNotes: string[] }>;
}) => {
  const { innerNotes } = await params;
  const { isArchived } = getIdAndArchivedFromParams(
    innerNotes as unknown as string[]
  );
  // todo : check archive main page
  const notes = await getNotes({
    isArchived,
  });

  return (
    <section className="flex w-full h-full">
      <NoteLayout notes={notes as string} className="hidden lg:flex" />
      <Note />
      <ActionBar />
    </section>
  );
};

export default NotesPage;
