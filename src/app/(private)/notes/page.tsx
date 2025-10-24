import { getNotes } from '@/src/actions/notes';
import { AbsoluteBtn, ActionBar, NoteLayout } from '@/src/components';
import { getIdAndArchivedFromParams } from '@/src/utils';
import React from 'react';

const page = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ slug: string }>;
}) => {
  // todo: algo
  const innerNotes = await params;
  const { isArchived } = getIdAndArchivedFromParams(
    innerNotes as unknown as string[]
  );

  const filters = (await searchParams) || {};

  const notes = await getNotes({ isArchived });

  return (
    <div className="flex w-full flex-col gap-4 px-8 lg:px-0">
      <h1 className="font-preset-1 text-neutral-950 dark:text-white lg:hidden">
        All notes
      </h1>
      <NoteLayout
        notes={notes as string}
        className="max-md:!px-0 max-md:!py-0"
      />
      <AbsoluteBtn />
      <ActionBar />
    </div>
  );
};

export default page;
