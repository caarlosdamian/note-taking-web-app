import { PropsWithChildren } from 'react';
import { Header } from './header';
import { MenuBar } from './menuBar';
import { Navegation } from './sidebar/navegation';
import { generateNavElements, homeNavegation } from '../utils';
import { ItemListI } from './shared/itemList';

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

interface Props extends PropsWithChildren {
  type?: 'screen' | 'sidebar';
  tagsData?: string;
}

export const ContentLayout = ({
  children,
  type = 'sidebar',
  tagsData,
}: Props) => {
  // Todo: login layout
  // Todo: Change name

  const normalizeTags = (JSON.parse(tagsData as string) as []).map(
    (tag: { name: string }) => ({
      label: tag.name,
      icon: 'tags',
      path: `/tags/${tag.name}`,
    })
  ) as ItemListI[];
  const navElements = generateNavElements([homeNavegation, normalizeTags], {
    index: 2,
    title: 'Tags',
  });

  const isSidebar = type === 'sidebar';
  return (
    <main
      className={`${
        !isSidebar
          ? 'bg-custom-neutral-100 dark:bg-custom-neutral-700'
          : 'bg-custom-neutral-100 dark:bg-custom-neutral-950'
      } flex  lg:bg-none`}
    >
      {isSidebar && <Navegation navElements={navElements} />}
      <div className="w-full">
        {isSidebar ? (
          <>
            <Header />
            <div className="dark:bg-custom-neutral-950 bg-white h-[calc(100dvh-110px)] md:h-[calc(100dvh-148px)] lg:h-[calc(100dvh-81px)] flex rounded-2xl lg:rounded-none">
              {children}
            </div>
            <MenuBar elements={menu} />
          </>
        ) : (
          <> {children}</>
        )}
      </div>
    </main>
  );
};
