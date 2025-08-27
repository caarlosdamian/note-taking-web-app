import { ContenLayout, MenuBar, Modal } from '@/src/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'privade',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContenLayout type="sidebar">{children}</ContenLayout>;
}
