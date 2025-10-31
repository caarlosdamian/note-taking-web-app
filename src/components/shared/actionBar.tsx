'use client';
import React, { use } from 'react';
import { Button } from '../button';
import { usePathname } from 'next/navigation';
import { modalContext } from '@/src/context';
import { archiveNote, deleteNote } from '@/src/actions/notes';
import { IconList } from '@/src/utils';
import { useGetNoteDetails } from '@/src/hooks/useGetNoteDetails';

export const ActionBar = () => {
  const { openModal } = use(modalContext);
  // todo: hacer un redirect al archivar o restor
  const iconSize = { width: 20, height: 20 };
  const pathname = usePathname();
  const { noteId } = useGetNoteDetails();

  const isArchive = pathname.includes('/archived');
  const ARCHIVE_INFO = isArchive
    ? {
        title: '',
        description: '',
        actionLabel: '',
        icon: 'restore',
      }
    : {
        title: 'Archive Note',
        description:
          'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.',
        actionLabel: 'Archive Note',
        icon: 'archived',
      };


  if (!noteId) return null;

  return (
    <div className="basis-1/3 lg:px-4 lg:py-5 bg-white dark:bg-custom-neutral-950 hidden lg:flex lg:flex-col gap-3 border-l-2 border-custom-neutral-200 dark:border-custom-neutral-800">
      <Button
        iconSize={iconSize}
        variant="border"
        onClick={async () => {
          if (isArchive) {
            await archiveNote({
              noteId: noteId as string,
              path: `/notes/${noteId}`,
              forceValue: false,
            });
          } else {
            openModal({
              title: ARCHIVE_INFO.title,
              description: ARCHIVE_INFO.description,
              icon: ARCHIVE_INFO.icon as IconList,
              btnVariant: 'primary',
              actionLabel: ARCHIVE_INFO.actionLabel,
              actionCallback: async () => {
                await archiveNote({
                  noteId: noteId as string,
                  path: `/notes/archived/${noteId}`,
                  forceValue: true,
                });
              },
            });
          }
        }}
        icon={ARCHIVE_INFO.icon as IconList}
        className="w-full flex items-center gap-2"
      >
        {isArchive ? 'Restore Note' : 'Archive Note'}
      </Button>

      <Button
        iconSize={iconSize}
        variant="border"
        icon="delete"
        className="w-full flex items-center gap-2"
        onClick={() => {
          openModal({
            title: 'Delete Note',
            description:
              'Are you sure you want to permanently delete this note? This action cannot be undone.',
            icon: 'delete',
            btnVariant: 'danger',
            actionLabel: 'Delete Note',
            actionCallback: () => {
              deleteNote({ noteId: noteId as string });
            },
          });
        }}
      >
        Delete Note
      </Button>
    </div>
  );
};
