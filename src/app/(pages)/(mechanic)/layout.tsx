import { Footer } from '@/components/elements/footer';
import { Navbar } from '@/components/elements/navbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <Navbar />
      <main className="w-full max-w-[1600px] flex-1 relative">
        <picture className="absolute inset-0 -z-10">
          <source srcSet="/img/bg/bg-desktop.jpg" media="(min-width: 768px)" />
          <img
            src="/img/bg/bg-mobile.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-95"
          />
        </picture>
        {children}
      </main>
      <Footer />
    </div>
  );
}
