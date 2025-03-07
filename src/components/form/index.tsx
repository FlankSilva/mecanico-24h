'use client';

import { useState } from 'react';
import { Button } from './button';
import { CheckboxList } from './checkbox';
import { Input } from './input';

export function Form() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherValue, setOtherValue] = useState('');

  return (
    <form action="" className="flex flex-col">
      <div className="flex flex-col gap-3 mb-4">
        <Input label="Nome" placeholder="Digite seu nome" />
        <Input label="Celular / Whatsapp" placeholder="(00) 00000-0000" />
        <Input label="Endereço" placeholder="Rua, nº, bairro" />
        <Input label="Email" placeholder="exemplo@exemplo.com" />
        <Input label="Senha" placeholder="Digite sua senha" />
        <Input label="Confirmar senha" placeholder="Digite sua senha" />
      </div>

      <CheckboxList
        otherValue={otherValue}
        selectedOptions={selectedOptions}
        setOtherValue={setOtherValue}
        setSelectedOptions={setSelectedOptions}
      />

      <div className="w-full mt-5">
        <Button type="submit">
          <span className="text-white">Salvar</span>
        </Button>
      </div>
    </form>
  );
}

export { Button } from './button';
export { CheckboxList } from './checkbox';
export { Input } from './input';
