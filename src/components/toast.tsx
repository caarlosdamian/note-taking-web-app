import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  linkLabel?: string;
  linkPath?: string;
}

export const Toast = ({ title, linkPath, linkLabel }: Props) => {
  return (
    <div className="mt-5 flex bg-white justify-between items-center p-2 border-[1px] border-custom-neutral-200 rounded-lg">
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
          <Link href={linkPath} className="font-preset-6 underline underline-offset-4">
            {linkLabel}
          </Link>
        )}
        <Image
          src="./assets/images/icon-cross.svg"
          width={16}
          height={16}
          alt="cross-icon"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
