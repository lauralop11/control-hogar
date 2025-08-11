import Link from 'next/link';

export function Header() {
  return (
    <header className="relative h-20 text-white text-4xl font-bold tracking-widest flex justify-around items-center">
      <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center">
        <Link href="/" >
          <h2 className="pl-8 text-2xl w-full cursor-pointer">Finanzas Hogar</h2>
        </Link>
      </div>   
    </header>
  );
}