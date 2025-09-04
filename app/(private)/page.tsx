import { MenuBar, Navegation, Notes, TextInput } from '@/src/components';
import { Button } from '@/src/components/button';
import { Toast } from '@/src/components/toast';
import { Testing } from '@/src/sections/Testing';
import { generateNavElements, homeNavegation } from '@/src/utils';
import React from 'react';

// sin icono
// con un icono a la derecha
// con un icono a la izquierda
// con label
// con lable y link a la derecha
// con hint

const HomePage = () => {
  return (
    <div className="flex gap-4">
      <Notes
        btnLabel="Create New Note"
        btnIcon='plus'
        upperNote='All notes with the ”Dev” tag are shown here.'
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
