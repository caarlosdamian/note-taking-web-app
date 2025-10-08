import { getNotes } from '@/src/actions/notes';
import { NoteLayout } from '@/src/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'privade',
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const notes = await getNotes();
  return (
    <>
      {/* table y mobile es diferente */}
      <NoteLayout notes={notes} className="hidden" />
      {/* <InnerHeader /> */}
      {children}
    </>
  );
}
