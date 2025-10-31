'use client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  searchQuery: {
    q: string;
  };
  setSearchQuery: Dispatch<
    SetStateAction<{
      q: string;
    }>
  >;
}

export const searchContext = createContext<Props>({
  searchQuery: {
    q: '',
  },
  setSearchQuery: () => {},
});

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<{ q: string }>(() => ({
    q: searchParams.get('q') || '',
  }));
  return (
    <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </searchContext.Provider>
  );
};
