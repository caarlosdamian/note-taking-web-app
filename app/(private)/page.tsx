import { Notes } from '@/src/components';
import { notes } from '@/src/utils';
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex gap-4">
      <Notes
        redirect
        notes={notes}
        btnLabel="Create New Note"
        btnIcon="plus"
        upperNote="All notes with the ”Dev” tag are shown here."
        action={async () => {
          'use server';
          // ESTO DEBE DE VIVIR EN UN COMPONENTE DE CLIENTE PARA SU CORRECTO FUNCIONAMIENTO
          console.log('ESTO ES SERVER ACTION');
        }}
      />
    </div>
  );
};

export default HomePage;
