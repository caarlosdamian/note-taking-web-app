import { useParams } from 'next/navigation';
import { getIdAndArchivedFromParams } from '../utils';

export const useGetNoteDetails = () => {
  const { innerNotes, noteId } = useParams<{
    innerNotes: string[];
    noteId: string;
  }>();

  const params = getIdAndArchivedFromParams(innerNotes);

  return { ...params, noteId };
};
