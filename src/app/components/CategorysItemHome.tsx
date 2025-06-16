import TotalCompte from "./TotalCompte";
import Link from "next/link";

export default function CategorysItemHome() {

  const itemsCategory = [
    { nombre: "Ingresos", link: "/pages/ingresos" , color:"bg-income"},
    { nombre: "Gastos", link: "/pages/gastos", color:"bg-expenses" },
    { nombre: "Ahorros", link: "/pages/ahorros" , color:"bg-savings"},
  ]

  return (
    <section className=" grid grid-rows-3 w-full p-4 gap-2 md:gap-2 md:h-[20rem] items-center]">
      { itemsCategory.map((category, index) => (
        <Link key={index} href={category?.link || "#"} className={`${category?.color} text-xl text-white p-4 rounded-lg flex justify-between items-center`}>
          <span>{category.nombre}</span>
          <span> $<TotalCompte tipo={category.nombre}/></span>
        </Link>    
        ))  
      }
    </section>
  );
}