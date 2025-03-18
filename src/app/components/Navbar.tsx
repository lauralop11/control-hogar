'use client'
import Image from "next/image";
import Link from 'next/link'

const Navbar = () => {
  return (
  <nav className="w-full h-20 bg-navbar fixed bottom-0 block">
    <ul className="w-full m-auto h-full flex justify-between align-middle">
      <li className="w-1/3 flex flex-col-reverse justify-center items-center">
        <p className="font-bold text-lg">Home</p>
        <Image src="/home.svg" width={24} height={24} alt="icono navbar"/>
      </li>
      <li className="w-1/3 flex flex-col-reverse justify-center items-center">
        <p className="font-bold text-lg">Gastos</p>
        <Image src="/donut.svg" width={24} height={24} alt="icono navbar"/>
      </li>
      <li className="w-1/3 ">
      <Link href="/formulario" className="w-full h-full flex flex-col-reverse justify-center items-center">
        <p className="font-bold text-lg">Mas</p>
        <Image src="/more.svg" width={24} height={24} alt="icono navbar"/>
      </Link>
        
      </li>
    </ul>
  </nav>
  );
};
export default Navbar;