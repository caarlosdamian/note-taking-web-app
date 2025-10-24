import { getNotes } from '@/src/actions/notes';
import { getTags } from '@/src/actions/tags';
import { AbsoluteBtn, NoteLayout } from '@/src/components';
import { List } from '@/src/components/shared/list';
import { getIdAndArchivedFromParams, normalizeTags } from '@/src/utils';
import React from 'react';

// todo: STREAM acabar seccion tags ******
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
  const tagsData = await getTags();

  const notes = await getNotes({});

  return (
    <div className="flex w-full flex-col gap-4 p-4 md:px-8">
      {/* <h1 className="font-preset-1 text-neutral-950 dark:text-white lg:hidden">
        All notes
      </h1> */}
      <List
        elements={normalizeTags(tagsData as string)}
        title="Tags"
        className="lg:hidden"
        elementsWithBorder
      />
      <NoteLayout
        notes={notes as string}
        className="hidden lg:flex !px-0 !py-0"
      />
      <AbsoluteBtn />
    </div>
  );
};

export default page;
