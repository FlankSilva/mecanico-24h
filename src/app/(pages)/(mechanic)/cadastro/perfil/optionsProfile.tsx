import { Handshake, Wrench } from 'lucide-react';
import { JSX } from 'react';

type OptionsProfile = { name: string; icon: JSX.Element; link: string };

export const optionsProfile: OptionsProfile[] = [
  {
    name: 'Comissionário',
    icon: <Handshake size={100} color="#4338ca" />,
    link: '/cadastro/perfil/comissionario',
  },
  {
    name: 'Mecânico',
    icon: <Wrench size={100} color="#4338ca" />,
    link: '/cadastro/perfil/mecanico',
  },
];
