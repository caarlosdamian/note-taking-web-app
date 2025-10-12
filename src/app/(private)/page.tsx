import { getNotes } from '@/src/actions/notes';
import { NoteLayout } from '@/src/components';

import React from 'react';

const HomePage = async () => {
  const notes = await getNotes();
  return (
    <div className="flex flex-col gap-4 overflow-hidden w-full h-full ">
      <NoteLayout className="  w-full" notes={notes as string} />
    </div>
  );
};

export default HomePage;
