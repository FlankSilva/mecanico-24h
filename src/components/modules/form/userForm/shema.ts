import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const userFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome deve ter no máximo 100 caracteres'),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número de telefone inválido.'),
    address: z.string().min(5, 'O endereço deve ter pelo menos 5 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export function useUserForm() {
  return useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: 'john Doe',
      phone: '(99) 99999-9999',
      address: 'Rua Teste, 123',
      email: 'john.doe@me.com',
      password: '123456',
      confirmPassword: '123456',
    },
  });
}
