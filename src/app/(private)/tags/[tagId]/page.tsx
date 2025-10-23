import { getNotes } from '@/src/actions/notes';
import { getTags } from '@/src/actions/tags';
import { AbsoluteBtn, InnerHeader, NoteLayout } from '@/src/components';
import { List } from '@/src/components/shared/list';
import { normalizeTags } from '@/src/utils';
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
  const tagsData = await getTags();
  return (
    <div className="flex w-full h-full flex-col gap-4  py-5 px-4 md:py-6 md:px-9 lg:px-0 lg:py-0 lg:flex-row">
      {/* <List
        elements={normalizeTags(tagsData as string)}
        title={`Notes Tagged: ${tagId}`}
      /> */}
      <InnerHeader withoutActions withoutBorder />
      <h1 className="font-preset-1 text-custom-neutral-600 dark:text-custom-neutral-400 lg:hidden">
        All notes with the:
        <strong className=" text-custom-neutral-950 dark:text-white capitalize">
          {` ${tagId}`}
        </strong>
      </h1>
      <NoteLayout
        upperNote={`All notes with the ”${tagId}” tag are shown here.`}
        notes={notes as string}
        className="!px-0 !py-0"
      />
      <AbsoluteBtn />
    </div>
  );
};

export default page;
