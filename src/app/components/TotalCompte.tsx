"use client";
import { useState, useEffect } from "react";
import {Data} from "@app-types/types";

export default function TotalGasto({tipo}: {tipo : string}) {

  const [data, setData] = useState<Data[] | null>(null);
  // Fetch de la tabla gasto
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/${tipo}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [tipo]);

  // Calcular el total de los gastos
  const total: number = Array.isArray(data)
    ? Number(data.reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0).toFixed(2))
    : 0; 

  return (
    <div>
      <span>{total}</span>
    </div>
    

  );
}