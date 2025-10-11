import { useEffect, useState } from 'react';
import { getNote } from '../actions/notes';

export const useGetNote = (id: string | undefined) => {
  const [noteInfo, setNoteInfo] = useState({
    note: null as any,
    isLoading: false,
    isError: false,
  });

  const fetchNote = async () => {
    setNoteInfo((prev) => ({ ...prev, isLoading: true, isError: false }));
    try {
      const note = await getNote({ noteId: id });
      setNoteInfo({
        note: typeof note === 'string' ? JSON.parse(note) : note,
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      console.error('Error fetching note:', error);
      setNoteInfo((prev) => ({ ...prev, isLoading: false, isError: true }));
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchNote();
  }, [id]);

  return {
    ...noteInfo,
    noteInfo: noteInfo.note,
  };
};
