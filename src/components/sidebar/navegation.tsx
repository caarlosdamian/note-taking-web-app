import React from 'react';
import { Logo } from '../shared/logo';
import { ItemList } from '../shared/itemList';

export const Navegation = () => {
  return (
    <div className="min-w-[272px] h-dvh dark:bg-custom-neutral-800 bg-custom-neutral-100 hidden  px-4 py-3 lg:flex flex-col gap-4">
      <div className="">
        <Logo />
      </div>
      <div className="">
        <ul>
          {[
            {
              label: 'Inicio',
              icon: 'home',
              path: '/',
            }
          ].map((elemt)=><ItemList {...elemt}/>)}
        </ul>
      </div>
      {/* <div className=""> */}
      {/* Taglist => elementos => tag list  */}
      {/* </div> */}
    </div>
  );
};
