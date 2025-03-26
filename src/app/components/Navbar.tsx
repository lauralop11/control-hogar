'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [mostrarSelect, setMostrarSelect] = useState(false);

  useEffect(()=>{
    if(mostrarSelect){
      setTimeout(() => {
        setMostrarSelect(false);
      }, 5000);
    }
  })
  return (
  <nav className="w-full h-20 bg-navbar fixed bottom-0 ">
    <ul className="w-full m-auto h-full flex justify-between align-middle">
      <li className="w-1/3 flex flex-col-reverse justify-center items-center">
        <Link href="/" className="w-full h-full flex flex-col-reverse justify-center items-center">
          <p className="font-bold text-lg">Home</p>
          <Image src="/home.svg" width={24} height={24} alt="icono navbar"/>
        </Link>  
      </li>
      <li className="w-1/3">
        <Link href="/gastos" className="w-full h-full flex flex-col-reverse justify-center items-center"> 
          <p className="font-bold text-lg">Gastos</p>
          <Image src="/donut.svg" width={24} height={24} alt="icono navbar"/>
        </Link>
      </li>
      <li className="w-1/3 relative">
        <button className="w-full h-full flex flex-col-reverse justify-center items-center border-none" type="button" 
        onClick={() => setMostrarSelect(!mostrarSelect)}>
          <p className="font-bold text-lg">Mas</p>
          <Image src="/more.svg" width={24} height={24} alt="icono navbar"/>
        </button> 
        {
          mostrarSelect && (
          <ul className="w-[120%] absolute -top-25 -left-10 bg-navbar p-2 rounded-sm flex flex-col justify-center items-center" name="tarjeta" id="tarjeta"  >
            <li className="hover:scale-105 h-10">
              <Link href="/formAddGasto" onClick={() => setMostrarSelect(false)}>Agregar gasto😡</Link>
            </li>
            <li className="hover:scale-105 h-10">
              <Link href="/formAddAhorro" onClick={() => setMostrarSelect(false)}>Agregar ahorro🥹</Link>
            </li>
          </ul>
        ) 
        }
      </li>
    </ul>
  </nav>
  );
};
export default Navbar;