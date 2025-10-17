'use client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { getNotes } from '../actions/notes';

interface NotesContextI {
  setNormalizeNotes: Dispatch<SetStateAction<unknown[]>>;
  normalizeNotes: unknown[];
  createLocalNote: () => void;
  getNotesAndNormalize: () => void;
}

export const noteContext = createContext<NotesContextI>({
  normalizeNotes: [],
  setNormalizeNotes: () => {},
  createLocalNote: () => {},
  getNotesAndNormalize: () => {},
});

export const NoteContextProvider = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  // todo: necesitamos hacer refetch de manera optima
  // todo : debemos de cambiar los params no sobreescribir

  const queryparams = Object.fromEntries([...searchParams.entries()]);
  const [normalizeNotes, setNormalizeNotes] = useState<unknown[]>([]);

  const getNotesAndNormalize = async () => {
    try {
      const notes = await getNotes({
        query: queryparams as unknown as {
          tagName: string;
          isArchived: boolean;
          q: string;
        },
      });
      const notesNormalize = JSON.parse(notes as string);
      setNormalizeNotes(notesNormalize);
    } catch (error) {}
  };

  useEffect(() => {
    getNotesAndNormalize();
  }, []);

  const createLocalNote = () => {
    const id = crypto.randomUUID();
    const newNote = { id, title: 'TITULO DE PRUEBA Note' };
    setNormalizeNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  return (
    <noteContext.Provider
      value={{
        setNormalizeNotes,
        normalizeNotes,
        createLocalNote,
        getNotesAndNormalize,
      }}
    >
      {children}
    </noteContext.Provider>
  );
};
