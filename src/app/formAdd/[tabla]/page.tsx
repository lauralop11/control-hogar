'use client';
import {useParams} from "next/navigation";
import AddForm from "@components/AddForm";

type Params ={
  tabla: string;
}
export default function PageFormAdd() {
  const params = useParams() as Params;
  const {tabla} = params;

  const colores = {
    ahorros: "text-savings",
    gastos: "text-expenses",
    ingresos: "text-income",
  }
  const color: string = colores[tabla] || "text-black";
  return(
    <section>
      <h2 className={`${color} font-bold text-xl text-center mb-5`}>Agregar {tabla}</h2>
      <AddForm tabla={tabla}/>
    </section> 
  )
  
}