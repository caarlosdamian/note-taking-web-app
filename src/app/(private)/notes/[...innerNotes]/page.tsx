import { getNotes } from '@/src/actions/notes';
import { AbsoluteBtn, ActionBar, Note, NoteLayout } from '@/src/components';
import { getIdAndArchivedFromParams } from '@/src/utils';
import React from 'react';

const NotesPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ innerNotes: string[]; noteId: string }>;
}) => {
  const { innerNotes, noteId, ...rest } = await params;
  const { isArchived } = getIdAndArchivedFromParams(
    innerNotes as unknown as string[]
  );
  // todo : check archive main page
  const notes = await getNotes({
    isArchived,
  });

  console.log('noteId', innerNotes);

  if (innerNotes.includes('archived') && innerNotes.length === 1)
    return (
      <div className="flex w-full flex-col gap-4 px-8 lg:px-0">
        <h1 className="font-preset-1 text-neutral-950 dark:text-white lg:hidden">
          Archived Notes
        </h1>
        <NoteLayout
          notes={notes as string}
          className="max-md:!px-0 max-md:!py-0"
          upperNote="All your archived notes are stored here. You can restore or delete them anytime."
        />
        <AbsoluteBtn />
        <ActionBar />
      </div>
    );

  return (
    <section className="flex w-full h-full">
      <NoteLayout notes={notes as string} className="hidden lg:flex" />
      <Note />
      <ActionBar />
      <AbsoluteBtn />
    </section>
  );
};

export default NotesPage;
