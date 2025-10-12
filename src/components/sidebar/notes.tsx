'use client';
import React, { useEffect } from 'react';
import { Button } from '../button';
import { IconList, isActive } from '@/src/utils';
import { Note } from '@/src/types';
import { NoteItem } from '../shared/noteItem';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQueryParamsTools } from '@/src/hooks/useQueryParamsTools';

interface Props {
  action?: () => void;
  btnLabel?: string;
  btnIcon?: IconList;
  emptyNote?: string;
  upperNote?: string;
  notes: Note[];
  redirect?: boolean;
  className?: string;
}

export const Notes = ({
  btnLabel,
  action,
  btnIcon,
  upperNote,
  notes,
  emptyNote,
  redirect,
  className,
}: Props) => {
  // const { createQueryString, setUrlQueryParams } = useQueryParamsTools();

  const pathname = useParams();

  return (
    <div
      className={`flex min-h-[calc(100dvh-81px)] w-full basis-full  dark:bg-custom-neutral-950 bg-white px-4 py-5 flex-col gap-4 lg:border-r-[1px] border-custom-neutral-200 dark:border-custom-neutral-800 overflow-scroll lg:w-[242px] lg:max-w-[242px] lg:basis-1/4   ${className}`}
    >
      {btnLabel && action && (
        <Button
          variant="primary"
          className="hidden lg:flex w-full justify-center"
          onClick={async () => {
            await action();
          }}
          icon={btnIcon}
        >
          {btnLabel}
        </Button>
      )}
      {upperNote && (
        <p className=" font-preset-5 dark:text-custom-neutral-200 text-custom-neutral-700">
          {upperNote}
        </p>
      )}
      {notes?.length >= 1 ? (
        notes.map((elemento) => (
          <NoteItem
            isActive={isActive(
              pathname._id as unknown as string,
              elemento._id as string
            )}
            key={elemento?._id}
            note={elemento}
          />
        ))
      ) : (
        <p className="mt-4 font-preset-5 dark:text-custom-neutral-200 text-custom-neutral-700 dark:bg-custom-neutral-800 bg-custom-neutral-100 rounded-md p-2">
          {emptyNote ??
            `No notes have been archived yet. Move notes here for safekeeping, or`}
          {!emptyNote && (
            <a href="" className="ml-2 underline">
              create a new note.
            </a>
          )}
        </p>
      )}
      {/* Actions btns opcional o nota  */}
      {/* Notas opcional  */}
      {/* List opcial o nota   */}
    </div>
  );
};
