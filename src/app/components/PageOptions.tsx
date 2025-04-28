import Grafica from "@components/Grafica";
import Acordion from "@components/Acordion";
import BudgetLimite from "@components/BudgetLimit";
import { Data } from '@app-types/types';

 type PageOptionsProps = {
  data: Data[] | null;
  tipo:string;
  total: number;
};

export default function PageOptions({data, tipo, total}: PageOptionsProps) {

const colors = {
  ahorros: "text-savings",
  gastos: "text-expenses",
  ingresos: "text-income",
}
const color = colors[tipo] || "text-primary";
const budget = () => {
  if(tipo === "gastos"){
    return <BudgetLimite data={data}/>
  }
  return null;
}
  return (
    <section className=" flex flex-col items-center" >
    <h2 className={`${color} font-extrabold text-2xl `}>{tipo.toUpperCase()} TOTALES ${total}</h2>
    <div className="grid md:grid-cols-2 justify-items-center items-center gap-5 w-full m-5">
      <Grafica data={data}/>
      {budget()}
    </div>
      <Acordion data={data} tipo={tipo}/> 
    </section>
  );
}