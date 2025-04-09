"use client";
import { useState, useEffect } from "react";
import Acordion from '@components/Acordion';
import TotalAhorro from '@components/TotalAhorro';
import Grafica from "@components/Grafica";

type Data = {
  descripcion: string;
  monto: string | number;
  categoria: string;
  tarjeta: string;
  fecha: string | number;
  id: number;
};

export default function Ahorros() {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("api/ahorros");
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
      <h2 className=" font-extrabold text-2xl text-expenses">Ahorro total $<TotalAhorro/></h2>
      <Grafica data={data}/>
      <Acordion data={data} tipo="ahorros"/>
    </div>
  );
}