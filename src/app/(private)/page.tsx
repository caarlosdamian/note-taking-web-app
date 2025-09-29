import { NoteLayout } from '@/src/components';
import React from 'react';

const HomePage = () => {
  console.log('llegando aqui');
  return (
    <div className="flex flex-col gap-4 overflow-hidden w-full h-full ">
      {/* <h1 className="lg:hidden font-preset-1 text-neutral-950 dark:text-white">
        All Notes
      </h1> */}
      {/* <NoteLayout className="lg:hidden w-full !px-0 !py-0" /> */}
      <NoteLayout className="hidden  w-full" />
    </div>
  );
};

export default HomePage;
