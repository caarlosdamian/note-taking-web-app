import { getNotes } from '@/src/actions/notes';
import { AbsoluteBtn, InnerHeader, NoteLayout } from '@/src/components';
import React from 'react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // todo: algo
  const filters = (await searchParams) || {};

  const notes = await getNotes({ } );

  return (
    <div className="flex w-full flex-col gap-4 p-4 md:px-8">
      <h1 className="font-preset-1 text-neutral-950 dark:text-white">
        All notes
      </h1>
      <NoteLayout notes={notes as string} className=" !px-0 !py-0" />
      <AbsoluteBtn />
    </div>
  );
};

export default page;
