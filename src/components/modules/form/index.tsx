'use client';

import { Button } from '@/components/form/button';
import { CheckboxList } from '@/components/form/checkbox';
import { Input } from '@/components/form/input';
import { ImageUpload } from '@/components/form/inputFile';
import { SelectDropdown } from '@/components/form/select';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export type CitiesresponseProps = {
  label: string;
  value: string;
};

type FormProps = {
  statesOptions: CitiesresponseProps[];
};

type FormDataProps = {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Form({ statesOptions }: FormProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherValue, setOtherValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleCreateNewMechanicUser(data: FormDataProps) {
    const newData = {
      ...data,
      services: selectedOptions,
    };

    console.log(newData);
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormDataProps>({
    values: {
      address: 'Rua, n°, bairro',
      name: 'Fulano da Silva',
      phone: '(00) 00000-0000',
      email: 'sVtQK@example.com',
      password: '123456',
      confirmPassword: '123456',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewMechanicUser)}
      className="flex flex-col"
    >
      <div className="flex flex-col gap-3 mb-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nome"
              placeholder="Digite seu nome"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Celular / Whatsapp"
              placeholder="(00) 00000-0000"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Endereço"
              placeholder="Rua, nº, bairro"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="exemplo@exemplo.com"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirmar senha"
              placeholder="Digite sua senha"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>

      <CheckboxList
        label="Serviços"
        otherValue={otherValue}
        selectedOptions={selectedOptions}
        setOtherValue={setOtherValue}
        setSelectedOptions={setSelectedOptions}
      />

      <ImageUpload
        previewUrl={previewUrl}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setPreviewUrl={setPreviewUrl}
      />

      <div className="w-full mt-4">
        <SelectDropdown
          label="Cidade"
          placeholder="Selecione uma cidade"
          options={statesOptions}
        />
      </div>

      <div className="w-full mt-5">
        <Button type="submit">
          <span className="text-white">Salvar</span>
        </Button>
      </div>
    </form>
  );
}
