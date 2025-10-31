'use client';
import React, { use, useEffect } from 'react';
import { TextInput } from '../textInput';
import { searchContext } from '@/src/context/searchContext';
import { useQueryParamsTools } from '@/src/hooks/useQueryParamsTools';
import { useDeboucing } from '@/src/hooks/useDeboucing';

export const SearchInput = () => {
  const { searchQuery, setSearchQuery } = use(searchContext);
  const { setUrlQueryParams, removeQueryParams } = useQueryParamsTools();
  const { debouceValue } = useDeboucing(searchQuery.q as string, 350);

  useEffect(() => {
    if (debouceValue.length > 0) {
      setUrlQueryParams({ q: debouceValue });
    } else {
      removeQueryParams();
    }

    return () => {};
  }, [debouceValue]);

  return (
    <TextInput
      placeholder="Search by title, content, or tags…"
      iconLeft="search"
      value={searchQuery.q}
      onChange={(e) => {
        setSearchQuery(() => ({ q: e.target.value }));
      }}
    />
  );
};
