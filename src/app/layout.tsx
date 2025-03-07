import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--inter' });

export const metadata: Metadata = {
  title:
    'Mecanicos 24 Horas - Encontre serviços de emergência em todo o Brasil',
  description:
    'Localize serviços de mecânicos 24 horas em todas as cidades do Brasil. Assistência automotiva de emergência a qualquer hora.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
