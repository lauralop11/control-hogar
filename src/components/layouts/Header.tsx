import Link from 'next/link';

export default function Header() {
  return (
    <header className="mb-10 relative h-15 shadow-sm bg-header text-white tracking-widest">
      <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center">
        <Link href="/" >
          <h2 className="font-bold text-2xl w-full cursor-pointer pl-5">Finanzas Hogar</h2>
        </Link>
      </div>   
    </header>
  );
}