'use client';
import { useEffect, useState } from 'react';

export const useDeboucing = (value: string, delay: number) => {
  const [debouceValue, setdebouceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    debouceValue,
  };
};
