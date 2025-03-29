'use client';

import { useState } from 'react';

import { Options, SelectDropdown } from '@/components/elements/form/select';
import { SelectProps } from '@/types/selectProps';

type DropDownProps = {
  statesOptions: SelectProps[];
};

export function DropDownGetCity({ statesOptions }: DropDownProps) {
  const [selectedCity, setSelectedCity] = useState<Options | Options[]>([]);

  return (
    <SelectDropdown
      label="Selecione a cidade"
      placeholder="Pesquisar..."
      options={statesOptions}
      setSelectedOption={setSelectedCity}
    />
  );
}
