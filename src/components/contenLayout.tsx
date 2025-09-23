import { PropsWithChildren } from 'react';
import { Header } from './header';
import { MenuBar } from './menuBar';
import { Navegation } from './sidebar/navegation';
import { generateNavElements, homeNavegation, tagsNavegation } from '../utils';

const menu = [
  {
    label: 'Inicio',
    icon: 'home',
    path: '/',
  },
  {
    label: 'Search',
    icon: 'search',
    path: '/search',
  },
  {
    label: 'Archived',
    icon: 'archived',
    path: '/archived',
  },
  {
    label: 'Tags',
    icon: 'tags',
    path: '/tags',
  },
  {
    label: 'Settings',
    icon: 'settings',
    path: '/settings',
  },
];

export const ContentLayout = ({ children }: PropsWithChildren) => {
  // Todo: login layout
  // Todo: Change name
  const navElements = generateNavElements([homeNavegation, tagsNavegation], {
    index: 2,
    title: 'Tags',
  });

  return (
    <main className="flex bg-custom-neutral-100 dark:bg-custom-neutral-950 lg:bg-none">
      <Navegation navElements={navElements} />
      <div className="w-full">
        <Header />
        <div className="dark:bg-custom-neutral-950 bg-white h-[calc(100dvh-110px)] md:h-[calc(100dvh-148px)] lg:h-[calc(100dvh-81px)] flex rounded-2xl lg:rounded-none">
          {children}
        </div>
        <MenuBar elements={menu} />
      </div>
    </main>
  );
};
