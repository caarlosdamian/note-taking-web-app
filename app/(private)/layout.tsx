import {
  ContentLayout,
  InnerHeader,
  MenuBar,
  Modal,
  Notes,
} from '@/src/components';
import { notes } from '@/src/utils';
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
  return (
    <ContentLayout>
      {/* table y mobile es diferente */}
      <Notes
        redirect
        notes={notes}
        btnLabel="Create New Note"
        btnIcon="plus"
        upperNote="All notes with the ”Dev” tag are shown here."
        action={async () => {
          'use server';
          // ESTO DEBE DE VIVIR EN UN COMPONENTE DE CLIENTE PARA SU CORRECTO FUNCIONAMIENTO
          console.log('ESTO ES SERVER ACTION');
        }}
      />
      {/* <InnerHeader /> */}
      {children}
    </ContentLayout>
  );
}
