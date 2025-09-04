'use client';
import React from 'react';
import { Button } from '../button';
import { IconList } from '@/src/utils';

interface Props {
  action?: () => void;
  btnLabel?: string;
  btnIcon?: IconList;
  upperNote?: string;
}

export const Notes = ({ btnLabel, action, btnIcon, upperNote }: Props) => {
  return (
    <div className="h-[calc(100dvh-81px)] w-[242px] dark:bg-custom-neutral-950 bg-white hidden  px-4 py-5 lg:flex flex-col gap-4 border-r-[1px] border-custom-neutral-200 dark:border-custom-neutral-800">
      {btnLabel && action && (
        <Button
          variant="primary"
          className="w-full justify-center"
          onClick={async () => {
            await action();
          }}
          icon={btnIcon}
        >
          {btnLabel}
        </Button>
      )}
      {upperNote && (
        <p className="font-preset-5 dark:text-custom-neutral-200 text-custom-neutral-700">
          {upperNote}
        </p>
      )}
      {/* Actions btns opcional o nota  */}
      {/* Notas opcional  */}
      {/* List opcial o nota   */}
    </div>
  );
};
