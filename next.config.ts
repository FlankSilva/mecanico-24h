import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN ?? 'localhost',
        pathname: '/**',
      },
      {
        hostname: 'mecanico-24h.vercel.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
