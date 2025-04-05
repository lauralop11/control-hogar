"use client";
import { useState, useEffect } from "react";
import Acordion from '@components/Acordion';
import TotalGasto from '@components/TotalGasto';
import Grafica from "@components/Grafica";

type Data = {
  tarjeta: string;
  monto: string | number;
  descripcion: string;
  categoria: string;
};

export default function Gastos() {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/getGastos");
      const data: Data[] = await res.json();
      return setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);
  
 
  return (
    <div className="h-[calc(100dvh+80px)] flex flex-col items-center" >
      <h2 className=" font-extrabold text-2xl text-expenses">Gastos totales $<TotalGasto/></h2>
      <Grafica data={data}/>
      <Acordion  data={data}/>
    </div>
  );
}