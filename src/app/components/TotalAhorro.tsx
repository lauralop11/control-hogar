"use client";
import { useState, useEffect } from "react";

type Data = {
  descripcion: string;
  monto: string | number;
  categoria: string;
  tarjeta: string;
  fecha: string | number;
  id: number;
};


export default function TotalAhorro() {
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/ahorros");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const total = Array.isArray(data)
    ? Number(data.reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0).toFixed(2))
    : 0; 

  return (
    <span>{total}</span>

  );
}