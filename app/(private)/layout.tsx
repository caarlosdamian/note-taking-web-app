import { ContentLayout, MenuBar, Modal } from '@/src/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'privade',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContentLayout type="sidebar">{children}</ContentLayout>;
}
