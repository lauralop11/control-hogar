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
    ahorros: "savings",
    gastos: "expenses",
    ingresos: "income",
  }
  const color: string = colores[tabla] || "text-black";
  return(
    <section>
      <h2 className={`text-${color} font-bold text-xl text-center mb-5`}>`Agregar ${tabla}`</h2>
      <AddForm tabla={tabla} color={color}/>
    </section> 
  )
  
}