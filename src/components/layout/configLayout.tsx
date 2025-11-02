import React, { PropsWithChildren } from 'react';
import { InnerHeader } from '../shared/innerHeader';
import { Button } from '../button';

interface Props extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export const ConfigLayout = ({ title, subtitle, children }: Props) => {
  return (
    <div className="py-6 px-4 flex flex-col w-full lg:max-w-[528px]">
      <InnerHeader withoutActions withoutBorder urlLabel="Settings" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-preset-1 text-custom-neutral-950 dark:text-white">
            {title}
          </h3>
          <h5 className="font-preset-5 text-custom-neutral-700 dark:text-custom-neutral-300">
            {subtitle}
          </h5>
        </div>
        {children}
        <Button variant="primary" className='self-end'>Apply Changes</Button>
      </div>
    </div>
  );
};
