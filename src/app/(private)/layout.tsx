import { auth } from '@/auth';
import {
  ContentLayout,
  InnerHeader,
  MenuBar,
  Modal,
  NoteLayout,
  Notes,
} from '@/src/components';
import { notes } from '@/src/utils';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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
  const session = await auth();
  if (!session) {
    redirect('/signin');
  }
  // const testing = await params
  // const headerds = await  headers()
  // console.log(headerds,'++')
  return (
    <ContentLayout>
      {/* table y mobile es diferente */}
      {/* <InnerHeader /> */}
      {children}
    </ContentLayout>
  );
}
