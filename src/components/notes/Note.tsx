'use client';
import { notes } from '@/src/utils';
import { useParams } from 'next/navigation';
import React from 'react';
import { Icon } from '../icon';
import { Span } from 'next/dist/trace';

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
    <section>
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
    </section>
  );
};
