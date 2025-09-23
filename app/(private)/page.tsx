import { NoteLayout } from '@/src/components';
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4  overflow-scroll w-full px-8 py-6">
      <h1 className="lg:hidden font-preset-1 text-neutral-950 dark:text-white">
        All Notes
      </h1>
      <NoteLayout className="lg:hidden w-full !px-0 !py-0" />
    </div>
  );
};

export default HomePage;
