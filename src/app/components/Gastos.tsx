"use client";
import { useState, useEffect } from "react";
import Acordion from '@components/Acordion';
import TotalGasto from '@components/TotalGasto';
import Grafica from "@components/Grafica";
import { Data } from '../types/types';

export default function Gastos() {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("api/gastos");
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
    <div className=" flex flex-col items-center" >
      <h2 className=" font-extrabold text-2xl text-expenses">Gastos totales $<TotalGasto/></h2>
      <Grafica data={data}/>
      <Acordion data={data} tipo="gastos"/>
    </div>
  );
}