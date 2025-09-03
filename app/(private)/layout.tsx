import { ContentLayout, MenuBar, Modal } from '@/src/components';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'privade',
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  // const testing = await params
  // const headerds = await  headers()
  // console.log(headerds,'++')
  return <ContentLayout>{children}</ContentLayout>;
}
