import Container from '@/components/elements/container';
import Link from 'next/link';
import { optionsProfile } from './optionsProfile';

export default function Profile() {
  return (
    <Container>
      <h2 className="text-2xl font-bold mb-2 text-[#4338ca]">
        Perfil de usuário
      </h2>

      <p className="text-[16px] mb-5">Escolha o tipo de perfil</p>

      <div>
        <div className="flex justify-between gap-6">
          {optionsProfile.map(option => (
            <Link
              key={option.name}
              href={option.link}
              className="
                border 
                border-[#4338ca] 
                rounded-2xl 
                w-full
              "
            >
              <button
                className="
                  w-full h-full flex 
                  flex-col 
                  items-center 
                  p-3
                "
              >
                {option.icon}
                <p className="text-[18px] font-bold text-[#4338ca]">
                  {option.name}
                </p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
