'use client';
import { use } from 'react';
import { IconList } from '../utils';
import { BtnVariant, Button } from './button';
import { Icon } from './icon';
import { themeContext } from '../context';
import { modalContext } from '../context/modalContext';

export interface ModalProps {
  title: string;
  description: string;
  actionLabel: string;
  icon: IconList;
  id?: string;
  actionCallback: () => void;
  btnVariant?: BtnVariant;
}

export const Modal = ({
  title,
  description,
  icon,
  actionLabel,
  id,
  actionCallback,
  btnVariant = 'primary',
}: ModalProps) => {
  const { isDarkMode } = use(themeContext);
  const { closeIndividualModal } = use(modalContext);
  return (
    <div
      role="dialog"
      className="bg-white  rounded-xl w-fit min-w-[345px] border-[1px] border-custom-neutral-200 dark:bg-custom-neutral-700 dark:border-custom-neutral-600"
    >
      <div className="flex gap-4 p-5">
        <div className="w-10 h-10 rounded-lg bg-custom-neutral-100 flex items-center justify-center dark:bg-custom-neutral-600">
          <Icon
            icon="search"
            color={isDarkMode ? '#fff' : '#0E121B'}
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-custom-neutral-950 font-preset-3 dark:text-white">
            {title}
          </span>
          <span className="text-custom-neutral-700 font-preset-5 max-w-[246px] dark:text-custom-neutral-200">
            {description}
          </span>
        </div>
      </div>
      <div className="h-[1px] bg-custom-neutral-200 dark:bg-custom-neutral-600" />
      <div className="flex gap-4 justify-end items-start px-5 py-4">
        <Button
          variant="secondary"
          onClick={() => id && closeIndividualModal(id)}
        >
          Cancel
        </Button>
        <Button
          variant={btnVariant}
          onClick={() => {
            try {
              actionCallback && actionCallback();
              id && closeIndividualModal(id);
            } catch (error) {}
          }}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};
