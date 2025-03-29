import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border w-full">
      <div>
        <div>
          <h3>Mecanico 24 Horas</h3>

          <p>
            Encontre serviços de mecânicos 24 horas em todas as cidades do
            Brasil. Assistência automotiva de emergência quando você mais
            precisa.
          </p>
        </div>

        <div>
          <h4>Links Rápidos</h4>

          <ul>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Serviços</h4>

          <ul>
            <li>
              <Link href="/">Socorro Mecânico</Link>
            </li>
            <li>
              <Link href="/sobre">Troca de Bateria</Link>
            </li>
            <li>
              <Link href="/contato">Troca de Pneu</Link>
            </li>
            <li>
              <Link href="/contato">Chaveiro Automotivo</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contato</h4>

          <ul>
            <li>
              <Link href="/">WhatsApp: +55 11 5197-4403</Link>
            </li>
            <li>
              <Link href="/sobre">Atendimento 24 horas</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p>© 2023 Mecanico 24 Horas - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
