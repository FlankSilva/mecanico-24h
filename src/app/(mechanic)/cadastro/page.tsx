import Container from '@/components/elements/container';
import { UserForm } from '@/components/modules/form/userForm';

export default async function Cadastro() {
  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5 text-[#4338ca]">Criar conta</h2>

      <div className="rounded-2xl border border-zinc-200 p-5">
        <h3 className="mb-3 text-[16px]">Insira seus dados</h3>
        <UserForm />
      </div>
    </Container>
  );
}
