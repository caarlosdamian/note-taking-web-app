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

  const removeLasteElement = (elementsToRemove?: boolean) => {
    const newurl = pathName.split('/');
    if (elementsToRemove) {
      const url = newurl.slice(1, 2);
      const newUrl = url.join('/');

      setNormalizePathName(newUrl.startsWith('/') ? newUrl : '/' + newUrl);
      return;
    }
    newurl.pop();
    setNormalizePathName(newurl.join('/'));
  };
  // todo: remover los comentarios
  useEffect(() => {
    if (params.innerNotes) {
      removeLasteElement(true);
    }

    if (params.noteId) {
      removeLasteElement();
    }
  }, [pathName]);


  return {
    normalizePathName,
  };
};
