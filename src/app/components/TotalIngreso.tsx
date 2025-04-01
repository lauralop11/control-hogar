"use client";
import { useState, useEffect } from "react";

type Data = {
  descripcion: string;
  monto: string | number;
  tarjeta: string;
  fecha: string | number;
};

export default function TotalIngreso() {
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getIngresos");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const total: number = Array.isArray(data)
    ? Number(data.reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0).toFixed(2))
    : 0; 

  return (
    <span>{total}</span>

  );
}