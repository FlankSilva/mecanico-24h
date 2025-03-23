'use client';

import { Button } from '@/components/elements/form/button';
import { Input } from '@/components/elements/form/input';
import { storageAuthTokenSave } from '@/storage/authToken';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormDataProps = {
  email: string;
  password: string;
};

type ResponseUser = {
  token: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormDataProps>({
    values: {
      email: 'sVtQK@example.com',
      password: '123456',
    },
  });

  async function handleLogin(data: FormDataProps) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao enviar os dados:', errorData);
        return;
      }

      const result: ResponseUser = await response.json();

      storageAuthTokenSave(result.token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="rounded-2xl border border-zinc-200 p-5 pb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-7 text-[#4338ca]">Login</h2>
        <form
          action=""
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                placeholder="Digite seu e-mail"
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
                label="Password"
                placeholder="Digite sua senha"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Button type="submit">
            <span className="text-white my-1">Logar</span>
          </Button>
        </form>

        <Link href={'/cadastro'} className="mt-6">
          <span className="text-[#4338ca]">Criar conta</span>
        </Link>
      </div>
    </div>
  );
}
