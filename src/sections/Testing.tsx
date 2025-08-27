'use client';
import React, { use } from 'react';
import { Button } from '../components';
import { modalContext } from '../context/modalContext';

export const Testing = () => {
  const { openModal } = use(modalContext);
  return (
    <div>
      <Button
        variant="primary"
        onClick={() =>
          openModal({
            actionCallback: () => console.log('Pasandolo como prop'),
            title: 'Delete Note',
            description:
              'Are you sure you want to permanently delete this note? This action cannot be undone.',
            actionLabel: 'Delete Note',
            icon: 'delete',
            btnVariant:'danger'
          })
        }
      >
        Abrir modal
      </Button>
    </div>
  );
};
