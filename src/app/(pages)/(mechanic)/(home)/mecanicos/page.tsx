import { CardMechanic } from '@/components/elements/cards/cardMechanic';
import Container from '@/components/elements/container';

export default async function Mecanicos() {
  // A chamada fetch para a API pode ser feita aqui diretamente, porque este é um Server Component.
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

  try {
    const response = await fetch(`${apiBaseUrl}/api/users/mechanic`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const states: any = await response.json();
    console.log(states);

  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="min-h-[calc(100vh-70px)]">
      <Container>
        <h1 className="text-3xl font-bold text-white text-center mt-5 mb-5">
          Mecânicos 24 Horas
        </h1>

        <CardMechanic />
      </Container>
    </div>
  );
}
