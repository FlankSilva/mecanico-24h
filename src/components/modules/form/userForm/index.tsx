'use client';

import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/elements/form/button';
import { Input } from '@/components/elements/form/input';
import { TextErrorGeneral } from '@/components/elements/form/textErrorGeneral';
import { useResponseCreateUser } from '@/context/responseCreateUser';
import { storageAuthTokenSave } from '@/storage/authToken';
import { useRouter } from 'next/navigation';

type FormDataProps = {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ResponseCreateUser = {
  token: string;
};

export function UserForm() {
  const router = useRouter();

  const { setMessageResponse } = useResponseCreateUser();

  async function handleCreateNewMechanicUser(data: FormDataProps) {
    setMessageResponse('');

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

        if (response.status === 409) {
          setMessageResponse('Usuário ja cadastrado');
        }

        console.error('Erro ao enviar os dados:', errorData);
        return;
      }

      const result: ResponseCreateUser = await response.json();

      storageAuthTokenSave(result.token);

      router.push('/cadastro/perfil');
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

      <TextErrorGeneral>E-mail ja está cadastrado</TextErrorGeneral>
      <div className="w-full mt-5">
        <Button type="submit">
          <span className="text-white">Salvar</span>
        </Button>
      </div>
    </form>
  );
}
