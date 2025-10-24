import React from 'react';
import { ItemList, ItemListI } from '../shared/itemList';

interface Props {
  elements: ItemListI[];
  title?: string;
  className?: string;
  elementsWithBorder?: boolean;
}

export const List = ({
  elements,
  title,
  className,
  elementsWithBorder = false,
}: Props) => {
  return (
    <div className={`flex flex-col gap-4 lg:gap-2 ${className}`}>
      {title && (
        <span className="font-preset-1 text-custom-neutral-950 dark:text-white lg:font-preset-4 lg:text-neutral-500 ">
          {title}
        </span>
      )}
      <ul>
        {elements.map((element, index) => (
          <ItemList
            key={element.path}
            {...element}
            withBorder={
              index === elements.length - 1 ? false : elementsWithBorder
            }
          />
        ))}
      </ul>
    </div>
  );
};
