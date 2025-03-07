export interface StatesProps {
  id: number;
  sigla: string;
  nome: string;
}

export interface CitiesProps {
  id: number;
  nome: string;
  microrregiao: {
    nome: string;
    mesorregiao: {
      nome: string;
      UF: {
        id: 35;
        sigla: string;
        nome: string;
        regiao: {
          sigla: string;
          nome: string;
        };
      };
    };
  };
}

export async function fetchStates(): Promise<StatesProps[]> {
  const res = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  );
  const states: StatesProps[] = await res.json();

  return states.sort((a, b) => a.nome.localeCompare(b.nome));
}

export async function fetchCities(): Promise<CitiesProps[]> {
  const res = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios',
  );

  const cities: CitiesProps[] = await res.json();

  return cities.sort((a, b) => a.nome.localeCompare(b.nome));
}
