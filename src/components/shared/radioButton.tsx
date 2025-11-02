'use client';
import { themeContext } from '@/src/context';
import { Icon } from '../icon';
import { use } from 'react';
import { RadioElement } from '@/src/types';

// props
// elemento => id , label, action , activeElement => id
// todo: agregar accion cuando se de click maybe ira en componente padre
// active se calcula por la prop active
export const RadioButton = ({
  item,
  selectedOption,
  handleSelectOption,
}: {
  item: RadioElement;
  selectedOption: string;
  handleSelectOption: (s: string) => void;
}) => {
  const { label, id, subtitle, icon } = item;
  const isActive = selectedOption === id;
  const { isDarkMode } = use(themeContext);

  return (
    <section
      className={`flex py-[18px] gap-4 rounded-xl px-4 items-center border-[1px]  border-custom-neutral-200 dark:border-custom-neutral-800 cursor-pointer justify-between w-full ${
        isActive ? 'bg-custom-neutral-100 dark:bg-custom-neutral-800' : ''
      }`}
      onClick={() => handleSelectOption(id)}
      role="radio"
    >
      <div className="flex gap-4 items-center">
        <div
          className={`rounded-xl border-[1px] border-custom-neutral-200 dark:border-custom-neutral-800 p-2 ${
            isActive ? 'dark:bg-custom-neutral-950 bg-white' : ''
          }`}
        >
          <Icon
            icon={icon}
            height={24}
            width={24}
            color={isDarkMode ? '#fff' : '#525866'}
          />
        </div>
        <div className="flex flex-col gap-1.5 text-custom-neutral-950 dark:text-white font-preset-6 grid-rows-2">
          <span>{label}</span>
          <span className="text-custom-neutral-700 dark:text-custom-neutral-300">
            {subtitle}
          </span>
        </div>
      </div>
      <div className="">
        <div
          className={`rounded-full h-4 w-4 border-2  ${
            isActive
              ? 'border-4 border-custom-blue-500 dark:border-custom-blue-500'
              : 'border-custom-neutral-200 dark:border-custom-neutral-600'
          }`}
        />
      </div>
    </section>
  );
};
