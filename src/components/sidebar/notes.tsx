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
  upperNote?: string;
  notes: Note[];
}

export const Notes = ({
  btnLabel,
  action,
  btnIcon,
  upperNote,
  notes,
}: Props) => {
  const router = useRouter();
  const pathname = useParams();

  useEffect(() => {
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
      {notes.map((elemento) => (
        <NoteItem
          isActive={isActive(pathname.id as unknown as string, elemento.id)}
          key={elemento.title}
          note={elemento}
        />
      ))}
      {/* Actions btns opcional o nota  */}
      {/* Notas opcional  */}
      {/* List opcial o nota   */}
    </div>
  );
};
