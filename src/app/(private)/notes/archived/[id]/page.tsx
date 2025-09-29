import { Note } from '@/src/components';
import React from 'react';

const NotesPage = () => {
  return (
    <section className="flex basis-full lg:basis-3/4 h-full">
      <h1>Archive</h1>
      <Note />
      {/* 
      <div className="basis-1/3 bg-amber-300 hidden lg:flex"></div> */}
    </section>
  );
};

export default NotesPage;
