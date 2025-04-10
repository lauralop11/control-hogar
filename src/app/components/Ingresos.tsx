"use client";
import { useState, useEffect } from "react";
import Acordion from '@components/Acordion';
import TotalIngreso from '@components/TotalIngreso';
import Grafica from "@components/Grafica";
import { Data } from '../types/types';

export default function Ingresos() {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("api/ingresos");
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
      <h2 className=" font-extrabold text-2xl text-expenses">Ingresos total $<TotalIngreso/></h2>
      <Grafica data={data}/>
      <Acordion data={data} tipo="ingresos"/>
    </div>
  );
}