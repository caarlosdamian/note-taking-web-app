'use client';
import React, { use } from 'react';
import { Logo } from './shared/logo';
import { useParams, usePathname } from 'next/navigation';
import { sectionTitles } from '../utils';
import { TextInput } from './textInput';
import { Icon } from './icon';
import { themeContext } from '../context';

export const Header = () => {
  const pathname = usePathname();
  const params = useParams<{ id: string; tagId: string }>();
  const { isDarkMode } = use(themeContext);
  const getTitle = pathname.split('/');
  const titleKey = getTitle[1] !== '' ? getTitle[1] : 'home';

  // Todo: add search functionality with backend

  return (
    <nav className="bg-custom-neutral-100 dark:bg-custom-neutral-950 lg:bg-white h-[54px]  md:h-[74px] lg:h-[81px] py-[13px] px-4 md:py-[23px] md:px-8 lg:py-3 lg:border-b-[1px] border-custom-neutral-200 dark:border-custom-neutral-800">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="hidden lg:flex justify-between items-center">
        <span className="font-preset-1 text-neutral-950 dark:text-white">
          {params.id || params.tagId
            ? sectionTitles[
                titleKey as unknown as keyof typeof sectionTitles
              ]?.title.replace('{tag}', params.tagId)
            : sectionTitles[titleKey as unknown as keyof typeof sectionTitles]
                ?.title}
        </span>
        <div className="flex items-center gap-6">
          <TextInput
            placeholder="Search by title, content, or tags…"
            iconLeft="search"
          />
          <Icon
            width={24}
            height={24}
            color={isDarkMode ? '#99A0AE' : '#525866'}
            icon="settings"
          />
        </div>
      </div>
    </nav>
  );
};
