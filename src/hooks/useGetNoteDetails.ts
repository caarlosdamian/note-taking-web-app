import { useParams } from 'next/navigation';
import { getIdAndArchivedFromParams } from '../utils';

export const useGetNoteDetails = () => {
  const { innerNotes } = useParams<{ innerNotes: string[] }>();

  const params = getIdAndArchivedFromParams(innerNotes);

  return params;
};
