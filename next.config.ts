import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN ?? 'localhost', // Certifique-se de que está configurando o domínio correto aqui
        pathname: '/**',
      },
      {
        hostname: 'mecanico-24h.vercel.app', // Adicionando explicitamente o domínio do seu site
        pathname: '/uploads/**', // Definindo o caminho onde suas imagens estão localizadas
      },
    ],
  },
};

export default nextConfig;
