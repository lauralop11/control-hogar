import Grafica from "@components/Grafica";
import Acordion from "@components/Acordion";
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
console.log(data);
  return (
    <div className=" flex flex-col items-center" >
    <h2 className={`${color} font-extrabold text-2xl `}>{tipo} totales ${total}</h2>
      <Grafica data={data}/>
      <Acordion data={data} tipo={tipo}/> 
    </div>
  );
}