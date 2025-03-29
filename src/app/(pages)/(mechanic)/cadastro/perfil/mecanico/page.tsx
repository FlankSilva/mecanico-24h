"use client";

import Container from "@/components/elements/container";
import { MechanicForm } from "@/components/modules/form/mechanicForm";
import { SelectProps } from "@/types/selectProps";
import { useEffect, useState } from "react";

type StatesResponse = {
  estados: {
    sigla: string;
    nome: string;
    cidades: string[];
  }[];
};

export default function Mecanico() {
  const [citiesStates, setCitiesStates] = useState<SelectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/estados-cidades.json`);
        if (!response.ok) {
          throw new Error("Falha ao carregar dados");
        }
        const states: StatesResponse = await response.json();

        const citiesStates = states.estados.flatMap((state) =>
          state.cidades.map((city) => ({
            label: `${city} - ${state.sigla}`,
            value: `${city} - ${state.sigla}`,
          }))
        );

        setCitiesStates(citiesStates);
      } catch (err) {
        setError("Erro ao carregar cidades");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5 text-[#4338ca]">
        Dados do mecânico
      </h2>
      <div className="rounded-2xl border border-zinc-200 p-5">
        <h3 className="mb-3 text-[16px]">Insira seus dados</h3>
        <MechanicForm statesOptions={citiesStates} />
      </div>
    </Container>
  );
}
