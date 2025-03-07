import Header from '../../components/header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      <main className="w-full max-w-7xl">{children}</main>
    </div>
  );
}
