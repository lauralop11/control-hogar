import Link from 'next/link';

export default function Header() {
  return (
    <header className="mb-4 relative h-15 shadow-xl shadow-gray-300/60 bg-header text-white tracking-widest">
      <div className="absolute top-0 left-0 w-full h-full flex justify-around items-center">
        <Link href="/" >
          <h2 className="font-lg text-2xl w-full cursor-pointer">Financial Home</h2>
        </Link>
      </div>   
    </header>
  );
}