import Container from "@/components/elements/container";
import { DropDownGetCity } from "@/components/modules/form/mechanicForm/dropDown";
import { SelectProps } from "@/types/selectProps";
import Link from "next/link";

export default async function Home() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
  const errorMessage = "Erro ao carregar cidades";
  let citiesStates: SelectProps[] = [];
  let error: string | null = null;

  try {
    const response = await fetch(`${apiBaseUrl}/estados-cidades.json`);
    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const states = await response.json();

    citiesStates = states.estados.flatMap((state: any) =>
      state.cidades.map((city: any) => ({
        label: `${city} - ${state.sigla}`,
        value: `${city} - ${state.sigla}`,
      }))
    );
  } catch (err) {
    console.error(err);
    error = errorMessage;
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
