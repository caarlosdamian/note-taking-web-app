import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testing',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="flex items-center justify-center h-dvh">
    <div className="mx-auto grid grid-cols-1 items-center">
      {children}
    </div>
  );
}
