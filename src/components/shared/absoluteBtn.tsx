'use client';
import { use } from 'react';
import { Button } from '../button';
import { Icon } from '../icon';
import { themeContext } from '@/src/context';
import { useRouter } from 'next/navigation';
import { createNote } from '@/src/actions/notes';

export const AbsoluteBtn = () => {
  const router = useRouter();
  const addNewNote = async () => {
    const newNote = await createNote({ title: '', content: '' });
    const noteId = JSON.parse(newNote as string);
    router.push(`/notes/${noteId._id}`);
  };

  const { isDarkMode } = use(themeContext);

  return (
    <Button
      variant="primary"
      className="absolute bottom-[106px] md:bottom-[108px] !p-2 md:!p-4  right-9 !rounded-full lg:hidden"
      onClick={() => addNewNote()}
    >
      <Icon
        icon="plus"
        width={32}
        height={32}
        color={isDarkMode ? '#fff' : '#0E121B'}
      />
    </Button>
  );
};
