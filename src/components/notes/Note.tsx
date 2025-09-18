'use client';
import { notes } from '@/src/utils';
import { useParams } from 'next/navigation';
import React from 'react';
import { Icon } from '../icon';
import { Button } from '../button';

const transformText = (text: string) => {
  const formatedContent = text.split('\n').map((el, index) => {
    if (el === '') {
      return <br key={index} />;
    }
    return <p key={el}>{el}</p>;
  });

  return formatedContent;
};

export const Note = () => {
  const { id } = useParams<{ id: string }>();
  const [noteInfo] = notes.filter((ele) => ele.id === id);
  const { title, lastEdited, tags, content, id: noteId, isArchived } = noteInfo;

  const date = lastEdited
    ? new Date(lastEdited as string).toLocaleDateString('GB', {
        month: 'short',
        year: 'numeric',
        day: '2-digit',
      })
    : (new Date() as unknown as string);
  // si no hay info
  // si es create o edit
  // todo : mobile add innerHeader

  return (
    <section className="flex flex-col gap-5 basis-full lg:basis-2/3 px-6 py-5 h-full">
      {/* navegacion mobile */}
      <h1 className="font-preset-1 text-neutral-950 dark:text-white">
        {noteInfo.title}
      </h1>
      <div className="flex gap-3 flex-col">
        <div className="flex item-center gap-2">
          <div className="flex items-center gap-1.5">
            <Icon icon="tag" color="#717784" />
            <span className="text-neutral-950 dark:text-white">Tags</span>
          </div>
          {/* tags van a ser ids */}
          {/* Todo: estas se editan en linea */}
          <div className="flex items-center">
            {tags?.map((tag, index) => (
              <span
                {...(index !== 0 ? { before: ',' } : {})}
                key={tag}
                className="text-neutral-950 dark:text-white after:content before:content-[attr(before)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {lastEdited && (
          <div className="flex item-center gap-2">
            <div className="flex items-center gap-1.5">
              <Icon icon="clock" color="#717784" />
              <span className="text-neutral-950 dark:text-white">
                Last edited
              </span>
            </div>
            {/* tags van a ser ids */}
            <div className="flex items-center">
              <span className="text-neutral-950 dark:text-white after:content before:content-[attr(before)]">
                {lastEdited && date && <span>{date}</span>}
              </span>
            </div>
          </div>
        )}
      </div>
      <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px] w-full" />
      <div className={`text-neutral-950 dark:text-white basis-full`}>
        {content && transformText(content as string)}
      </div>
      <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px] w-full" />
      <div className="flex gap-4 justify-self-end  items-end">
        <Button variant="primary">Save Note</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </section>
  );
};
