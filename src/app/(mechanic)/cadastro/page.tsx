import Container from '@/components/container';
import { Form } from '@/components/form';

export default function Cadastro() {
  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5 text-[#4338ca]">Cadastro</h2>

      <div className="rounded-2xl border border-zinc-200 p-5">
        <h3 className="mb-3 text-[14px]">Cadastro de perfil do mecânico</h3>
        <Form />
      </div>
    </Container>
  );
}
