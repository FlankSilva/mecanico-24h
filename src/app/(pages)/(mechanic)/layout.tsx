import { Footer } from '@/components/elements/footer';
import { Navbar } from '@/components/elements/navbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <main className="w-full max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}
