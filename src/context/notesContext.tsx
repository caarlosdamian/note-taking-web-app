'use client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { notes as test } from '../utils';

interface NotesContextI {
  setNotes: Dispatch<SetStateAction<unknown[]>>;
  notes: unknown[];
  createLocalNote: () => void;
}

export const noteContext = createContext<NotesContextI>({
  notes: [],
  setNotes: () => {},
  createLocalNote: () => {},
});

export const NoteContextProvider = ({ children }: PropsWithChildren) => {
  const [notes, setNotes] = useState<unknown[]>(() => test);

  const createLocalNote = () => {
    const id = crypto.randomUUID();
    const newNote = { id, title: 'TITULO DE PRUEBA Note' };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  return (
    <noteContext.Provider value={{ setNotes, notes, createLocalNote }}>
      {children}
    </noteContext.Provider>
  );
};
