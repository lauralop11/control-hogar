'use client';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getGastos");
        const json: Data[] = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-[calc(100vh+80px)] " >
      <h2 className=" font-extrabold text-2xl text-center text-expenses">Gastos totales $<TotalGasto/></h2>
      <Grafica data={data}/>
      <Acordion nameCard="costco" data={data}/>
      <Acordion nameCard="dejardins" data={data}/>
      <Acordion nameCard="cibc" data={data}/>
    </div>
  );
}