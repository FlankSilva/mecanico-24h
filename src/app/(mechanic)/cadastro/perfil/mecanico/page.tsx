import Container from '@/components/elements/container';
import { MechanicForm } from '@/components/modules/form/mechanicForm';
import { SelectProps } from '@/types/selectProps';

type StatesResponse = {
  estados: {
    sigla: string;
    nome: string;
    cidades: string[];
  }[];
};

export default async function Mecanico() {
  const response = await fetch('http://localhost:3000/estados-cidades.json');
  const states: StatesResponse = await response.json();

  const citiesStates: SelectProps[] = states.estados.flatMap(state =>
    state.cidades.map(city => ({
      label: `${city} - ${state.sigla}`,
      value: `${city} - ${state.sigla}`,
    })),
  );

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5 text-[#4338ca]">Criar conta</h2>

      <div className="rounded-2xl border border-zinc-200 p-5">
        <h3 className="mb-3 text-[16px]">Insira seus dados</h3>
        <MechanicForm statesOptions={citiesStates} />
      </div>
    </Container>
  );
}
