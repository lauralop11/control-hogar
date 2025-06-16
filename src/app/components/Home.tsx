"use client";
import React, { useState, useEffect } from 'react';
import { getDataFilter} from "@lib/getData";
import Grafica from '@components/Grafica';
import CategorysItemHome from '@components/CategorysItemHome';
import { Data } from "@app-types/types";

export default function Home () {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const [data, setData] = useState<Data[]| null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      getDataFilter("gastos").then(setData);
    };
    fetchData();
  }, []);
  /* const total: number = Array.isArray(data)
    ? Number( data .reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0)
          .toFixed(2)): 0; */
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h2 className="text-red-700 text-2xl font-extrabold m-3">{currentMonth}</h2>
      <Grafica data={data} />
      <CategorysItemHome/>
    </div>
  )
}