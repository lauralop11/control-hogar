'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [mostrarSelect, setMostrarSelect] = useState<boolean>(false);

  const tablas: string[] = ["gastos", "ahorros", "ingresos"];
  const itemsNav = [
    { nombre: "Home", icono: "/home.svg", link: "/" },
    { nombre: "Gastos", icono: "/donut.svg", link: "/pages/gastos" },
    { nombre: "Ahorro", icono: "/saving.svg", link: "/pages/ahorros" },
    { nombre: "Ingreso", icono: "/pays.svg", link: "/pages/ingresos" },
  ]
  useEffect(()=>{
    if(mostrarSelect){
      setTimeout(() => {
        setMostrarSelect(false);
      }, 5000);
    }
  })
  return (
  <nav className="w-full h-20 fixed bottom-0 shadow-2xl bg-white">
    <ul className="w-full m-auto h-full flex justify-between align-middle">
      {
       itemsNav.map((item, index) => (
          <li key={index} className="w-1/3 flex flex-col-reverse justify-center items-center">
          <Link href={item.link} key={index} className="w-full h-full flex flex-col-reverse justify-center items-center">
            <p className="font-bold text-basic">{item.nombre}</p>
            <Image src={item.icono} width={20} height={20} alt="icono navbar"/>
          </Link>
        </li>
        ))
      }
      <li className="w-1/3 relative">
        <button className="w-full h-full flex flex-col-reverse justify-center items-center border-none" type="button" 
        onClick={() => setMostrarSelect(!mostrarSelect)}>
          <p className="font-bold text-basic">Mas</p>
          <Image src="/more.svg" width={20} height={20} alt="icono navbar"/>
        </button> 
        {
          mostrarSelect && (
          <ul className="w-[200%] absolute -top-35 -left-20 bg-gray-100 p-2 rounded-sm flex flex-col justify-center items-center z-50" >
            <li className="hover:scale-110 h-10 text-base">
              <Link href = "/formCard" onClick={() => setMostrarSelect(false)}>Agregar Tarjeta</Link>
            </li>
           { tablas.map((tabla, index) => (
              <li key={index} className="hover:scale-110 h-10 text-base">
              <Link href={`/formAdd/${tabla}`} key={tabla} onClick={() => setMostrarSelect(false)}>Agregar {tabla}</Link>
            </li>
            ))}
          </ul>
        ) 
        }
      </li>
    </ul>
  </nav>
  );
};
export default Navbar;