import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-[#4338ca] text-white hover:text-blue-200 flex justify-center w-full">
      <nav className="flex justify-between px-4 py-6 w-full max-w-7xl">
        <div>
          <Link href="/">Logo</Link>
        </div>
        <ul className="flex gap-4">
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
