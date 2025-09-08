import { Note } from '@/src/types';
import { Tag } from './tag';
import { formatDate } from '@/src/utils';

interface Props {
  note: Note;
}

export const NoteItem = ({
  note: { content, isArchived, lastEdited, tags, title },
}: Props) => {
// Todo: agregar funcionalidad de activa
  return (
    <div className="flex flex-col gap-3 p-2 border-b-[1px] border-b-custom-neutral-200">
      <span className="font-preset-3 text-custom-neutral-950  dark:text-white">
        {title}
      </span>
      <div className="flex flex-wrap gap-2.5">
        {/* componente tags */}
        {tags.map((el) => {
          return <Tag key={el} note={el}/>;
        })}
      </div>
      <span>{formatDate(lastEdited)}</span>
    </div>
  );
};
