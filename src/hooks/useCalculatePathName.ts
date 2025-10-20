import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCalculatePathName = () => {
  navigator;
  const pathName = usePathname();
  const params = useParams<{ innerNotes: string[]; tagId: string }>();
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
      // if (params.innerNotes.length === 2) {
      //   const isArchived = params.innerNotes[0] === 'archived';
      //   if (isArchived) {
      //     removeLasteElement();
      //   }
      // }
    }
    // if (params.tagId) {
    //   const includes = pathName.includes(params.tagId as string);
    //   if (includes) {
    //     removeLasteElement();
    //   }
    // }
  }, [pathName]);

  /// quitar id

  return {
    normalizePathName,
  };
};
