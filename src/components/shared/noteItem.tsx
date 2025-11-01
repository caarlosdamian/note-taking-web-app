'use client';
import { Note } from '@/src/types';
import { Tag } from './tag';
import { formatDate } from '@/src/utils';
import Link from 'next/link';
import { useCalculatePathName } from '@/src/hooks/useCalculatePathName';
import { useSearchParams } from 'next/navigation';

interface Props {
  note: Note;
  isActive: boolean;
}

// todo: fix url no se olvide

export const NoteItem = ({
  note: { content, isArchived, lastEdited, tags, title, _id },
  isActive,
}: Props) => {
  const { normalizePathName } = useCalculatePathName();

  // /note => /notes/archived/id => /notes/id/
  // /tags => /tags/tagId => /tags/tagId/id
  const params = useSearchParams();

  const body = (
    <>
      <span className="font-preset-3 text-custom-neutral-950  dark:text-white">
        {title}
      </span>
      {tags && (
        <div className="flex flex-wrap gap-2.5">
          {tags.map((el: any) => {
            return <Tag key={el._id} note={el.name} />;
          })}
        </div>
      )}
      {lastEdited && (
        <span className="font-preset-6 text-custom-neutral-950  dark:text-custom-neutral-300">
          {formatDate(lastEdited)}
        </span>
      )}
    </>
  );

  const className = `flex flex-col gap-3 py-2 lg:px-2    ${
    isActive
      ? 'dark:bg-custom-neutral-800 bg-custom-neutral-100 rounded-md'
      : 'border-b-[1px] border-b-custom-neutral-200 dark:border-b-custom-neutral-800'
  }`;

  // Todo: agregar funcionalidad de activa
  // Todo: agregar dark mode
  // Todo: agregar modo edicion

  return isActive ? (
    <div className={className}>{body}</div>
  ) : (
    <Link
      href={`${normalizePathName}/${isArchived ? `archived/${_id}` : _id}${
        params.get('q') ? `?q=${params.get('q')}` : ''
      }`}
      aria-disabled
      className={className}
    >
      {body}
    </Link>
  );
};
