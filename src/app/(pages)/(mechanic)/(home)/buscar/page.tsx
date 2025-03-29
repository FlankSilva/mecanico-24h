"use client";

import Container from "@/components/elements/container";
import { DropDownGetCity } from "@/components/modules/form/mechanicForm/dropDown";
import { SelectProps } from "@/types/selectProps";
import Link from "next/link";
import { useEffect, useState } from "react";

type StatesResponse = {
  estados: {
    sigla: string;
    nome: string;
    cidades: string[];
  }[];
};

export default function Home() {
  const [citiesStates, setCitiesStates] = useState<SelectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

    console.log(apiBaseUrl);
    
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
        console.log(err);
        
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
    <div className="min-h-[calc(100vh-70px)]">
      <Container>
        <h1 className="text-3xl font-bold text-white text-center mt-5">Mecânicos 24 Horas</h1>
        <h2 className="text-[0.8rem] mt-8 text-gray-100">
          Encontre serviços de mecânicos 24 horas em todas as cidades do Brasil. Assistência automotiva de emergência quando você mais precisa.
        </h2>

        <div className="mt-6">
          <DropDownGetCity statesOptions={citiesStates} />
        </div>

        <div className="flex w-full mt-6 justify-center">
          <Link href="/mecanicos" className="w-[95%]">
            <button className="bg-[#4338ca] text-white font-semibold py-2 px-4 rounded w-full">
              <span>Buscar</span>
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
