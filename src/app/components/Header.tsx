import Link from 'next/link';

export default function Header() {
  return (
    <header className="pl-3 h-20 shadow-xl shadow-gray-300/60 flex justify-around items-center bg-header text-white tracking-widest">
      <Link href="/" className="flex items-center">
        <h2 className="font-lg text-2xl w-full cursor-pointer">Financial Home</h2>
      </Link>
    </header>
  );
}