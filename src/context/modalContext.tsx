'use client';
import { createContext, PropsWithChildren, useState } from 'react';
import { Overlay } from '../components/overlay';
import { Modal } from '../components';
import { ModalProps } from '../components/modal';

interface Props {
  openModal: (props: ModalProps) => void;
  closeIndividualModal: (id: string) => void;
  closeAllModals: () => void;
}

export const modalContext = createContext<Props>({
  openModal: function (props: ModalProps): void {
    throw new Error('Function not implemented.');
  },
  closeIndividualModal: function (id: string): void {
    throw new Error('Function not implemented.');
  },
  closeAllModals: function (): void {
    throw new Error('Function not implemented.');
  }
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<ModalProps[]>([]);

  const openModal = (props: ModalProps) => {
    const randomId = crypto.randomUUID();
    setModals((prev) => [...prev, { ...props, id: randomId }]);
  };

  const closeIndividualModal = (id: string) => {
    const newIds = [...modals].filter((modal) => modal.id !== id);
    setModals(newIds);
  };

  const closeAllModals = () => {
    setModals([]);
  };

  return (
    <modalContext.Provider value={{ openModal, closeIndividualModal,closeAllModals }}>
      {modals.length > 0 && (
        <Overlay>
          {modals.map((modalProps) => (
            <Modal key={modalProps.id} {...modalProps} />
          ))}
        </Overlay>
      )}
      {children}
    </modalContext.Provider>
  );
};
