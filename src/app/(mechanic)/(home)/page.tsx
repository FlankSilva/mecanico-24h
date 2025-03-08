import Container from '@/components/elements/container';
import SearchLocation from '@/components/elements/searchLocation';

export default function Home() {
  return (
    <div>
      <Container>
        <h1 className="text-center text-2xl font-bold text-[#4338ca]">
          Mecânicos 24 Horas
        </h1>

        <h2 className="text-center text-[0.8rem] mt-4">
          Encontre serviços de mecânicos 24 horas em todas as cidades do Brasil.
          Assistência automotiva de emergência quando você mais precisa.
        </h2>

        <SearchLocation />
      </Container>
    </div>
  );
}
