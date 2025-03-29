import Container from '@/components/elements/container';
import { DropDownGetCity } from '@/components/modules/form/mechanicForm/dropDown';
import { SelectProps } from '@/types/selectProps';
import Link from 'next/link';

type StatesResponse = {
  estados: {
    sigla: string;
    nome: string;
    cidades: string[];
  }[];
};

export default async function Home() {
  const response = await fetch('http://localhost:3000/estados-cidades.json');
  const states: StatesResponse = await response.json();

  const citiesStates: SelectProps[] = states.estados.flatMap(state =>
    state.cidades.map(city => ({
      label: `${city} - ${state.sigla}`,
      value: `${city} - ${state.sigla}`,
    })),
  );

  return (
    <div className="min-h-[calc(100vh-70px)]">
      <Container>
        <h1 className="text-3xl font-bold text-white text-center mt-5">
          Mecânicos 24 Horas
        </h1>

        <h2 className="text-[0.8rem] mt-8 text-gray-100">
          Encontre serviços de mecânicos 24 horas em todas as cidades do Brasil.
          Assistência automotiva de emergência quando você mais precisa.
        </h2>

        <div className="mt-6">
          <DropDownGetCity statesOptions={citiesStates} />
        </div>

        <div className="flex w-full mt-6 justify-center">
          <Link href="/mecanicos" className="w-[95%]">
            <button
              className="
              bg-[#4338ca] 
              text-white 
              font-semibold 
              py-2 
              px-4 
              rounded
              w-full
            "
            >
              <span>Buscar</span>
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
