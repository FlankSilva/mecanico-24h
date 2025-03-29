import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-[#1e272e] text-white hover:text-blue-200 flex justify-center w-full border-b border-[#ddd]">
      <nav className="flex justify-between px-4 py-6 w-full max-w-[1600px]">
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
