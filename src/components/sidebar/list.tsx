import React from 'react';
import { ItemList, ItemListI } from '../shared/itemList';

interface Props {
  elements: ItemListI[];
  title?: string;
}

export const List = ({ elements, title }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <span className='font-preset-4 text-neutral-500 '>{title}</span>}
      <ul>
        {elements.map((element) => (
          <ItemList key={element.path} {...element} />
        ))}
      </ul>
    </div>
  );
};
