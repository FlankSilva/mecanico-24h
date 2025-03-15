import Container from '@/components/elements/container';

export default async function Profile() {
  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5 text-[#4338ca]">
        Perfil de usário
      </h2>

      <div className="rounded-2xl border border-zinc-200 p-5"></div>
    </Container>
  );
}
