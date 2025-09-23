'use client';
import React from 'react';
import { Button } from '../button';
import { useRouter } from 'next/navigation';

export const InnerHeader = () => {
  const router = useRouter();
  return (
    <section className="flex lg:hidden justify-between pb-4 border-b-custom-neutral-200 dark:border-b-custom-neutral-800 border-b-[1px]">
      <div className="">
        <Button
          className="!font-preset-5 md:!font-preset-4"
          variant="link"
          icon="arrowLeft"
          onClick={() => router.push('/')}
        >
          Go back
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button className="!font-preset-5 md:!font-preset-4" variant="link">
          Go back
        </Button>
        <Button
          variant="link"
          className="!text-custom-blue-500 dark:!text-custom-blue-500 !font-preset-5 md:!font-preset-4"
        >
          Save
        </Button>
      </div>
    </section>
  );
};
