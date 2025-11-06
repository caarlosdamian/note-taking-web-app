import { auth } from '@/auth';
import { getTags } from '@/src/actions/tags';
import {
  ContentLayout,
  InnerHeader,
  MenuBar,
  Modal,
  NoteLayout,
  Notes,
} from '@/src/components';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Titulo de la pagina',
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
  const tags = (await getTags()) as string;

  return <ContentLayout tagsData={tags}>{children}</ContentLayout>;
}
