import { TextInput } from '@/src/components';
import { Button } from '@/src/components/button';
import { Toast } from '@/src/components/toast';
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
      <TextInput
        iconLeft="checkmark"
        iconRight='clock'
        label="New Password"
        placeholder="testing..."
        name="pass"
        hint='This is a hint text to help user.'
        linkLabel='Login'
        linkUrl='/login'
        // error='esto es error'
      />
    </div>
  );
};

export default HomePage;
