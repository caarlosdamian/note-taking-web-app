import { getNotes } from '@/src/actions/notes';
import { AbsoluteBtn, ActionBar, Note, NoteLayout } from '@/src/components';
import React from 'react';

const page = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ tagId: string }>;
}) => {
  const { tagId } = await params;
  // const { isArchived } = getIdAndArchivedFromParams(
  //   tagID as unknown as string[]
  // );
  const filters = (await searchParams) || {};

  const notes = await getNotes({
    tagName: tagId,
  });
  // todo: arreglar tags loyaout

  return (
    <section className="flex w-full h-full">
      <NoteLayout
        upperNote={`All notes with the ”${tagId}” tag are shown here.`}
        notes={notes as string}
        className="hidden lg:flex"
      />
      <Note />
      <ActionBar />
      <AbsoluteBtn />
    </section>
  );
};

export default page;
