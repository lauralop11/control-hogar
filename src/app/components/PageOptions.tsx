"use client";
import {useState, useEffect} from 'react';
import Grafica from "@components/Grafica";
import Acordion from "@components/Acordion";
import TotalCompte from '@components/TotalCompte';
import { Data } from '../types/types';


export default function PageOptions({tipo}: {tipo: string}) {

  const [data, setData] = useState< Data[] | null >(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/${tipo}`);
        if (!res.ok) {
          throw new Error("La respuesta no fue ok");
        }
        const json: Data[] = await res.json();
        setData (json);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      if(tipo){
        fetchData();
      }
      
  },[tipo]);

console.log(data);
  
const colors = {
  ahorros: "text-savings",
  gastos: "text-expenses",
  ingresos: "text-income",
}
const color = colors[tipo];

  return (
    <div className=" flex flex-col items-center" >
      <h2 className={`${color} font-extrabold text-2xl `}>{tipo} totales $<TotalCompte tipo={tipo} /></h2>
      <Grafica data={data}/>
      <Acordion data={data} tipo={tipo}/>
    </div>
  );
}