import { Children, PropsWithChildren } from 'react';
import { Header } from './header';
import { MenuBar } from './menuBar';
import { Navegation } from './sidebar/navegation';
import {
  generateNavElements,
  homeNavegation,
  tagsNavegation,
} from '../utils';

const menu = [
  {
    label: 'Inicio',
    icon: 'home',
    path: '/',
  },
  {
    label: 'Perfil',
    icon: 'user',
    path: '/perfil',
  },
  {
    label: 'Notificaciones',
    icon: 'bell',
    path: '/notificaciones',
  },
  {
    label: 'Configuración',
    icon: 'settings',
    path: '/configuracion',
  },
];

interface Props extends PropsWithChildren {
  type: 'desktop' | 'sidebar';
}

export const ContentLayout = ({ type, children }: Props) => {
  const sidebar = type === 'sidebar'; // true

  const navElements = generateNavElements([homeNavegation, tagsNavegation], {
    index: 2,
    title: 'Tags',
  });


  return (
    <main
      // className={`flex flex-col-reverse ${
      //   sidebar ? 'lg:flex-row lg:p-l-0 lg:gap-8' : ''
      // }`}
      className="flex"
    >
      <Navegation navElements={navElements} />
      <div className="w-full">
        <Header />
        <div className="bg-amber-900 h-[calc(100dvh-110px)] md:h-[calc(100dvh-148px)] lg:h-[calc(100dvh-74px)]">
          {children}
        </div>
        <MenuBar elements={menu} />
      </div>
    </main>
  );
};

// {sidebar && (
//   <>
//     <div className="order-1 max bg-amber-600">
//       <Header />
//     </div>
//     <div className="min-w-[272px] max-h-[74px] lg:max-h-screen bg-amber-400">
//       <Sidebar />
//       {/* <MenuBar elements={[]}/> */}
//     </div>
//   </>
// )}
// <div className="">
//     <div className="">
//       <div className="">
//         <Header />
//       </div>
//       <div className="grid grid-cols-12 gap-4 md:gap-6 basis-full px-4 md:px-8">
//         <div
//           className={`col-span-12 ${
//             sidebar
//               ? 'h-[calc(100vh-110px)] md:h-[calc(100vh-148px)] lg:h-screen'
//               : 'h-screen'
//           }`}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   </div>
