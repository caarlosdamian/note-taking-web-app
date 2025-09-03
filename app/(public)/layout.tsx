import { ContentLayout } from '@/src/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testing',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContentLayout>{children}</ContentLayout>;
}
