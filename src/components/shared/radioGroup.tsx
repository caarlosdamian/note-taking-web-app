'use client';
import React, { useState } from 'react';
import { RadioButton } from './radioButton';
import { RadioElement } from '@/src/types';
// props opciones

interface Props {
  elements: RadioElement[];
  children: (string: string) => React.ReactNode;
  defaultSelected?: string;
}

export const RadioGroup = ({ elements, children, defaultSelected }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelected || '');

  const handleSelectedOption = (id: string) => {
    setSelectedOption(id);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {elements.map((ele) => (
          <RadioButton
            item={ele}
            key={ele.id}
            selectedOption={selectedOption}
            handleSelectOption={handleSelectedOption}
          />
        ))}
      </div>
      {children(selectedOption)}
    </div>
  );
};
