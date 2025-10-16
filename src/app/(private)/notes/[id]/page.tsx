import { ActionBar, Note } from '@/src/components';
import React from 'react';

const NotesPage = () => {
  return (
    <section className="flex basis-full lg:basis-3/4 h-full">
      <Note />
      <ActionBar />
    </section>
  );
};

export default NotesPage;
