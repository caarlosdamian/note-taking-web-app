'use client';
import React, { useState } from 'react';
import { RadioButton } from './radioButton';
// props opciones

const elements = [
  {
    label: 'Color Theme',
    id: 'sun',
    subtitle: 'Pick a clean and classic light theme',
    icon: 'sun',

    action: () => console.log('sun'),
  },
  {
    label: 'Font Theme',
    subtitle: 'Select a sleek and modern dark theme',
    id: 'font',
    icon: 'font',
    action: () => console.log('font'),
  },
  {
    label: 'Change Password',
    subtitle: 'Adapts to your device’s theme',
    id: 'lock',
    icon: 'lock',
    action: () => console.log('font'),
  },
];
export const RadioGroup = () => {
  const [selectedOption, setselectedOption] = useState('');

  return (
    <div className="flex flex-col gap-2">
      {elements.map((ele) => (
        <RadioButton
          item={{ ...ele, action: () => setselectedOption(ele.id) }}
          selectedOption={selectedOption}
        />
      ))}
    </div>
  );
};
