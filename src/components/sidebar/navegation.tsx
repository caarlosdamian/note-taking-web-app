import React from 'react';
import { Logo } from '../shared/logo';
import { ItemListI } from '../shared/itemList';
import { List } from '../shared/list';

export interface NavElement {
  title?: string;
  id: string;
  items: ItemListI[];
}
interface Props {
  whitoutLogo?: boolean;
  navElements: NavElement[];
}

export const Navegation = ({ navElements, whitoutLogo }: Props) => {
  return (
    <aside
      className={`${
        whitoutLogo ? 'h-[calc(100dvh-81px)]' : 'h-dvh'
      } min-w-[272px] h dark:bg-custom-neutral-950 bg-white hidden  px-4 py-3 lg:flex flex-col gap-4 border-r-[1px] border-custom-neutral-200 dark:border-custom-neutral-800`}
    >
      {!whitoutLogo && (
        <div className="py-3">
          <Logo />
        </div>
      )}

      {navElements.map((element, index) => (
        <React.Fragment key={element.id}>
          <List elements={element.items} title={element.title} />
          {index !== navElements.length - 1 && (
            <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px]" />
          )}
        </React.Fragment>
      ))}
    </aside>
  );
};
