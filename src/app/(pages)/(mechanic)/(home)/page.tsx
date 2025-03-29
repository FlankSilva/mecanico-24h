import Container from '@/components/elements/container';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-70px)]">
      <Container>
        <h1 className="text-3xl font-bold text-white mt-10 text-center">
          Encontre Mecânicos 24h Perto de Você
        </h1>

        <div className="flex justify-center mt-28">
          <Link href="/buscar">
            <button className=" px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Buscar Mecânicos por cidade
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
