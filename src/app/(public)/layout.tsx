import { ContentLayout } from '@/src/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Note application',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentLayout type="screen">
      <div className="flex flex-col gap-2 h-screen items-center justify-center px-4">
        {children}
      </div>
    </ContentLayout>
  );
}
