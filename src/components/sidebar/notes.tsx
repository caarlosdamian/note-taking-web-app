'use client';
import React, { useEffect } from 'react';
import { Button } from '../button';
import { IconList, isActive } from '@/src/utils';
import { Note } from '@/src/types';
import { NoteItem } from '../shared/noteItem';
import { useParams, useRouter } from 'next/navigation';

interface Props {
  action?: () => void;
  btnLabel?: string;
  btnIcon?: IconList;
  emptyNote?: string;
  upperNote?: string;
  notes: Note[];
}

export const Notes = ({
  btnLabel,
  action,
  btnIcon,
  upperNote,
  notes,
  emptyNote,
}: Props) => {
  const router = useRouter();
  const pathname = useParams();

  useEffect(() => {
    // puede cambiar la logica
    if (notes.length >= 1) {
      router.push(`/notes/${notes[0].id}`);
    }
  }, []);

  return (
    <div className="h-[calc(100dvh-81px)] w-[242px] dark:bg-custom-neutral-950 bg-white hidden  px-4 py-5 lg:flex flex-col gap-4 border-r-[1px] border-custom-neutral-200 dark:border-custom-neutral-800 overflow-scroll">
      {btnLabel && action && (
        <Button
          variant="primary"
          className="w-full justify-center"
          onClick={async () => {
            await action();
          }}
          icon={btnIcon}
        >
          {btnLabel}
        </Button>
      )}
      {upperNote && (
        <p className="font-preset-5 dark:text-custom-neutral-200 text-custom-neutral-700">
          {upperNote}
        </p>
      )}
      {notes.length >= 1 ? (
        notes.map((elemento) => (
          <NoteItem
            isActive={isActive(
              pathname.id as unknown as string,
              elemento.id as string
            )}
            key={elemento.title}
            note={elemento}
          />
        ))
      ) : (
        <p className="font-preset-5 dark:text-custom-neutral-200 text-custom-neutral-700 dark:bg-custom-neutral-800 bg-custom-neutral-100 rounded-md p-2">
          {emptyNote ??
            `No notes have been archived yet. Move notes here for safekeeping, or`}
          {!emptyNote && <a href="" className='ml-2 underline'>create a new note.</a>}
        </p>
      )}
      {/* Actions btns opcional o nota  */}
      {/* Notas opcional  */}
      {/* List opcial o nota   */}
    </div>
  );
};
