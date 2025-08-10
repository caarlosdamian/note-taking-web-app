'use client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { ToastContainer } from '../components/toastContainer';

export interface ToastI {
  id: string;
  title: string;
  linkLabel?: string;
  linkPath?: string;
  callback?: () => void;
}

interface ToasContextI {
  toastInstances: ToastI[];
  setToastInstances: Dispatch<SetStateAction<ToastI[]>>;
  handleClose: (id: string) => void;
  addNewInstance: (toast: ToastI, duration?: number) => void;
}

export const toastContext = createContext<ToasContextI>({
  toastInstances: [],
  setToastInstances: () => {},
  handleClose: () => {},
  addNewInstance: () => {},
});

export const ToastContextProvider = ({ children }: PropsWithChildren) => {
  const [toastInstances, setToastInstances] = useState<ToastI[]>([
    {
      id: 'toast-1',
      title: 'Sesión iniciada correctamente',
      linkLabel: 'Ver perfil',
      linkPath: '/perfil',
      callback: () => {
        setTimeout(() => handleClose('toast-1'), 3000);
      },
    },
    {
      id: 'toast-2',
      title: 'Error al guardar los cambios',
      linkLabel: 'Reintentar',
      linkPath: '/editar',
      callback: () => {
        setTimeout(() => handleClose('toast-2'), 5000);
      },
    },
  ]);

  const handleClose = (id: string) => {
    setToastInstances((prev) => prev.filter((elemnt) => elemnt.id !== id));
  };

  const addNewInstance = (toast: ToastI, duration?: number) => {
    const randomID = crypto.randomUUID();
    const callback = () => {
      setTimeout(() => handleClose(randomID), duration || 3000);
    };

    const copi = [
      ...toastInstances,
      { ...toast, callback, id: randomID },
    ] as ToastI[];
    setToastInstances(copi);
  };

  return (
    <toastContext.Provider
      value={{ toastInstances, setToastInstances, handleClose, addNewInstance }}
    >
      <ToastContainer />
      {children}
    </toastContext.Provider>
  );
};
