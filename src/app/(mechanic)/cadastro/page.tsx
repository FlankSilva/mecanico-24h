import Container from '@/components/container';
import { CitiesresponseProps, Form } from '@/components/modules/form';

type StatesResponse = {
  estados: {
    sigla: string;
    nome: string;
    cidades: string[];
  }[];
};

export default async function Cadastro() {
  const response = await fetch('http://localhost:3000/estados-cidades.json'); // Em produção, use process.env.NEXT_PUBLIC_SITE_URL
  const states: StatesResponse = await response.json();

  const citiesStates: CitiesresponseProps[] = states.estados.flatMap(state =>
    state.cidades.map(city => ({
      label: `${city} - ${state.sigla}`,
      value: `${city} - ${state.sigla}`,
    })),
  );

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5 text-[#4338ca]">Cadastro</h2>

      <div className="rounded-2xl border border-zinc-200 p-5">
        <h3 className="mb-3 text-[14px]">Cadastro de perfil do mecânico</h3>
        <Form statesOptions={citiesStates} />
      </div>
    </Container>
  );
}
