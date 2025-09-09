import { Note } from '@/src/types';
import { Tag } from './tag';
import { formatDate } from '@/src/utils';
import Link from 'next/link';

interface Props {
  note: Note;
  isActive: boolean;
}

export const NoteItem = ({
  note: { content, isArchived, lastEdited, tags, title, id },
  isActive,
}: Props) => {
  // Todo: agregar funcionalidad de activa
  // Todo: agregar dark mode
  // Todo: agregar modo edicion

  console.log('isActive', isActive);
  return (
    <Link
      href={id ? `/notes/${id}` : ''}
      className={`flex flex-col gap-3 p-2 border-b-[1px] border-b-custom-neutral-200 dark:border-b-custom-neutral-800 rounded-md  ${
        isActive ? 'dark:bg-custom-neutral-800 bg-custom-neutral-100' : ''
      }`}
    >
      <span className="font-preset-3 text-custom-neutral-950  dark:text-white">
        {title}
      </span>
      <div className="flex flex-wrap gap-2.5">
        {tags.map((el) => {
          return <Tag key={el} note={el} />;
        })}
      </div>
      <span className="font-preset-6 text-custom-neutral-950  dark:text-custom-neutral-300">
        {formatDate(lastEdited)}
      </span>
    </Link>
  );
};
