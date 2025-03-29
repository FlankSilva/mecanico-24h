import { CardMechanic } from '@/components/elements/cards/cardMechanic';
import Container from '@/components/elements/container';

export default async function Mecanicos() {
  const response = await fetch('http://localhost:3000/api/users/mechanic');
  const states: any = await response.json();

  console.log(states);

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
