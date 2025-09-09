import React from 'react';

interface Props {
  note: string;
}

export const Tag = ({ note }: Props) => {
  return <div className='py-0.5 px-1.5 bg-custom-neutral-200 dark:bg-custom-neutral-600 dark:text-white rounded-sm font-preset-6'>{note}</div>;
};
