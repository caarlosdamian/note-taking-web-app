'use client';
import { PropsWithChildren, use } from 'react';
import { modalContext } from '../context/modalContext';

export const Overlay = ({ children }: PropsWithChildren) => {
  const { closeAllModals } = use(modalContext);
  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-custom-neutral-950/60 flex items-center justify-center cursor-pointer"
      onClick={() => closeAllModals()}
    >
      <div className="cursor-default">{children}</div>
    </div>
  );
};
