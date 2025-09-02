import { MenuBar, Navegation, TextInput } from '@/src/components';
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
      <Navegation whitoutLogo navElements={generateNavElements([homeNavegation])} />
    </div>
  );
};

export default HomePage;
