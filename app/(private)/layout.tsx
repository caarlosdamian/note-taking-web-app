import { ContenLayout, MenuBar } from '@/src/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'privade',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ContenLayout type="sidebar">
            <MenuBar
        elements={[
          {
            label: 'Home',
            icon: 'home',
            path: '/'
          },
          {
            label: 'Search',
            icon: 'search',
            path: '/search'
          },
          {
            label: 'Archived',
            icon: 'archived',
            path: '/archived'
          },
          {
            label: 'Tags',
            icon: 'tags',
            path: '/tags'
          },
          {
            label: 'Settings',
            icon: 'settings',
            path: '/settings'
          },
        ]}
      />
        
        {children}</ContenLayout>
  );
}
