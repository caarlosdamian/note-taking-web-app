import { Children, PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface Props extends PropsWithChildren {
  type: 'desktop' | 'sidebar';
}

export const ContenLayout = ({ type, children }: Props) => {
  const sidebar = type === 'sidebar';
  return (
    <main
      className={`flex flex-col-reverse ${
        sidebar ? 'lg:flex-row lg:p-l-0 lg:gap-8' : ''
      }`}
    >
      {sidebar && (
        <>
        <div className="order-1 max">
          <Header/>
        </div>
         <div className="min-w-[272px] max-h-[74px] lg:max-h-screen">
          <Sidebar />
        </div>
        </>
      )}
      <div className="grid grid-cols-12 gap-4 md:gap-6 basis-full px-4 md:px-8">
        <div
          className={`col-span-12 ${
            sidebar ? 'h-[calc(100vh-110px)] md:h-[calc(100vh-148px)] lg:h-screen' : 'h-screen'
          }`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};
