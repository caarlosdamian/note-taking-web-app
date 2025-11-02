'use client';
import React, { useState } from 'react';
import { RadioButton } from './radioButton';
import { RadioElement } from '@/src/types';
// props opciones

interface Props {
  elements: RadioElement[];
}

export const RadioGroup = ({ elements }: Props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectedOption = (id: string) => {
    setSelectedOption(id);
  };

  return (
    <div className="flex flex-col gap-2">
      {elements.map((ele) => (
        <RadioButton
          item={ele}
          selectedOption={selectedOption}
          handleSelectOption={handleSelectedOption}
        />
      ))}
    </div>
  );
};
