import { getNotes } from '@/src/actions/notes';
import { AbsoluteBtn, NoteLayout } from '@/src/components';
import React from 'react';

const page = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ tagId: string }>;
}) => {
  // todo: algo
  const { tagId } = await params;

  // const filters = (await searchParams) || {};

  const notes = await getNotes({
    tagName: tagId,
  });

  return (
    <div className="flex w-full h-full">
      <h1 className="font-preset-1 text-neutral-950 dark:text-white lg:hidden">
        Tags
      </h1>
      <NoteLayout
        upperNote={`All notes with the ”${tagId}” tag are shown here.`}
        notes={notes as string}
      />
      <AbsoluteBtn />
    </div>
  );
};

export default page;
