'use client';
import React, { use } from 'react';
import { toastContext } from '../context/toastContext';
import { Toast } from './toast';

export const ToastContainer = () => {
  const { toastInstances } = use(toastContext);

  return (
    <div className="fixed bottom-20 right-0 h-fit flex flex-col justify-end">
      {toastInstances.map((element) => (
        <Toast key={element.id} {...element} />
      ))}
    </div>
  );
};
