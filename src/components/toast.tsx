'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect } from 'react';
import { toastContext, ToastI } from '../context/toastContext';
import { Icon } from './icon';

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
        <Icon color="#21C16B" height={16} width={16} icon="checkmark" />
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
        <Icon color="#99A0AE" height={16} width={16} icon="cross" />
      </div>
    </div>
  );
};
