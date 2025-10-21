import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCalculatePathName = () => {
  navigator;
  const pathName = usePathname();
  const params = useParams<{
    innerNotes: string[];
    tagId: string;
    noteId: string;
  }>();
  const [normalizePathName, setNormalizePathName] = useState(() =>
    pathName === '/' ? '/notes' : pathName
  );

  const removeLasteElement = () => {
    const newurl = pathName.split('/');
    newurl.pop();
    setNormalizePathName(newurl.join('/'));
  };
  // todo: remover los comentarios
  useEffect(() => {
    if (params.innerNotes) {
      removeLasteElement();
    }
    if (params.noteId) {
      removeLasteElement();
    }
  }, [pathName]);

  /// quitar id

  return {
    normalizePathName,
  };
};
