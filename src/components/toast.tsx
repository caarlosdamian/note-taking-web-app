'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect } from 'react';
import { toastContext, ToastI } from '../context/toastContext';

interface Props extends ToastI {}

// todo
// Agregar funcionalidad de cerrar con click on link 

export const Toast = ({ title, linkPath, linkLabel, ...props }: Props) => {
  const { handleClose } = use(toastContext);

  useEffect(() => {
    let timeout: string;

    if (props.callback) {
      timeout = props?.callback() as unknown as string;
    }

    return () => {
      clearTimeout(timeout as unknown as string);
    };
  }, []);

  return (
    <div className="transition-all min-w-[274px] md:min-w-[390px] gap-6  mt-5 flex bg-white border-custom-neutral-200 text-custom-neutral-950 dark:text-white dark:bg-custom-neutral-700 justify-between items-center p-2 border-[1px] rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          src="./assets/images/icon-checkmark.svg"
          width={16}
          height={16}
          alt="icon"
          className=""
        />
        <span className="font-preset-6">{title}</span>
      </div>
      <div className="flex gap-2 items-center">
        {linkLabel && linkPath && (
          <Link
            href={linkPath}
            className="font-preset-6 underline underline-offset-4"
          >
            {linkLabel}
          </Link>
        )}
        <Image
          src="./assets/images/icon-cross.svg"
          width={16}
          height={16}
          alt="cross-icon"
          className="cursor-pointer dark:invert"
          onClick={() => handleClose(props.id as string)}
        />
      </div>
    </div>
  );
};
