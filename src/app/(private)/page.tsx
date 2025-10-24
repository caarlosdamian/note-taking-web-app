import { getNotes } from '@/src/actions/notes';
import { AbsoluteBtn, ActionBar, NoteLayout } from '@/src/components';

import React from 'react';

const HomePage = async () => {
  const notes = await getNotes({});
  return (
    // <div className="flex flex-col gap-4 overflow-hidden w-full h-full ">
    //   <NoteLayout className="w-full" notes={notes as string} />
    //   <AbsoluteBtn />
    // </div>

    <div className="flex w-full flex-col gap-4 p-4 md:px-8">
      <h1 className="font-preset-1 text-neutral-950 dark:text-white lg:hidden">
        All notes
      </h1>
      <NoteLayout notes={notes as string} className="max-md:!px-0 max-md:!py-0" />
      <AbsoluteBtn />
      <ActionBar />
    </div>
  );
};

export default HomePage;
