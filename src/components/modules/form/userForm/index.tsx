'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/elements/form/button';
import { Input } from '@/components/elements/form/input';
import { Options } from '@/components/elements/form/select';
import { SelectProps } from '@/types/selectProps';

type FormProps = {
  statesOptions: SelectProps[];
};

type FormDataProps = {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function UserForm({ statesOptions }: FormProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<Options>({} as Options);
  const [otherValue, setOtherValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Options | null>(null);

  async function handleCreateNewMechanicUser(data: FormDataProps) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          address: data.address,
          email: data.email,
          password_hash: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao enviar os dados:', errorData);
        return;
      }

      const result = await response.json();
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormDataProps>({
    values: {
      name: 'Fulano da Silva',
      phone: '(00) 00000-0000',
      address: 'Rua, n°, bairro',
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

      {/* <CheckboxList
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
          setSelectedOption={setSelectedCity}
        />
      </div> */}

      <div className="w-full mt-5">
        <Button type="submit">
          <span className="text-white">Salvar</span>
        </Button>
      </div>
    </form>
  );
}
