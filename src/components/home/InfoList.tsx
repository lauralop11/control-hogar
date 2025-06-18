import Link from "next/link";
import TotalForCategory from "@components/TotalForCategory";

export default function InfoList() {

  const itemsCategory = [
    { name: "Ingresos", link: "/income" , color:"bg-income", type:"income"},
    { name: "Gastos", link: "/expenses", color:"bg-expenses", type:"expenses"},
    { name: "Ahorros", link: "/savings" , color:"bg-savings", type:"savings"},
  ]
  return (
    <section className=" grid grid-rows-3 w-full p-4 gap-2 md:gap-2 md:h-[20rem] items-center]">
      { itemsCategory.map((category, index) => (
        <Link key={index} href={category?.link || "#"} className={`${category?.color} text-xl text-white p-4 rounded-lg flex justify-between items-center`}>
         <span>{category.name}</span>
         <span>$ <TotalForCategory type={category.type}/></span>
      </Link> 
        ))  
      }
      
    </section>
  );
}
