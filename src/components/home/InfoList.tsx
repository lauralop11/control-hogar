import Link from "next/link";
import { TotalForCategory } from "@components";

export function InfoList() {

  const itemsCategory = [
    { name: "Ingresos", link: "/income" , type:"income"},
    { name: "Gastos", link: "/expenses", type:"expenses"},
    { name: "Ahorros", link: "/savings" , type:"savings"},
  ]
  return (
    <section className="grid grid-rows-3 w-full gap-5 md:h-[20rem] items-center]">
      { itemsCategory.map((category, index) => (
        <Link key={index} href={category?.link || "#"} className="button btn-secondary text-xl p-4 rounded-lg flex justify-between items-center mx-4">
         <span>{category.name}</span>
         <span><TotalForCategory type={category.type}/></span>
      </Link> 
        ))  
      }
      
    </section>
  );
}
