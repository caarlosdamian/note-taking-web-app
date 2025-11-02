'use client';
import React, { use } from 'react';
import { Logo } from './shared/logo';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { sectionTitles } from '../utils';
import { Icon } from './icon';
import { themeContext } from '../context';
import { SearchInput } from './shared/searchInput';

export const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams<{ id: string; tagId: string }>();
  const { isDarkMode } = use(themeContext);
  const getTitle = pathname.split('/');
  const titleKey = getTitle[1] !== '' ? getTitle[1] : 'home';
  const router = useRouter();

  const generateTitle = () => {
    if (pathname.includes('archived')) {
      return sectionTitles.archived.title;
    }
    // todo: add debouce to search query

    if (pathname === '/tags') {
      return 'Select a Tag';
    }

    if (searchParams.get('q')) {
      return 'Showing results for: {query}'.replace(
        '{query}',
        searchParams.get('q') || ''
      );
    }

    if (params.tagId || params.id) {
      return sectionTitles[
        titleKey as unknown as keyof typeof sectionTitles
      ]?.title.replace('{tag}', params.tagId);
    }
    return sectionTitles[titleKey as unknown as keyof typeof sectionTitles]
      ?.title;
  };

  // Todo: add search functionality with backend
  return (
    <nav className="bg-custom-neutral-100 dark:bg-custom-neutral-950 lg:bg-white h-[54px]  md:h-[74px] lg:h-[81px] py-[13px] px-4 md:py-[23px] md:px-8 lg:py-3 lg:border-b-[1px] border-custom-neutral-200 dark:border-custom-neutral-800">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="hidden lg:flex justify-between items-center">
        <span className="font-preset-1 text-custom-neutral-950 dark:text-white">
          {generateTitle()}
        </span>
        <div className="flex items-center gap-6">
          <SearchInput />
          <Icon
            width={24}
            height={24}
            color={isDarkMode ? '#99A0AE' : '#525866'}
            icon="settings"
            className="cursor-pointer"
            onClick={() => router.push('/settings')}
          />
        </div>
      </div>
    </nav>
  );
};
