"use client";
import { useState, useEffect } from "react";

type Data = {
  monto: string | number;
  cuenta: string;
  fecha: string | number;
};

export default function TotalAhorro() {
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getAhorros");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const total : number = Array.isArray(data)
    ? data.reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0)
    : 0; 

  return (
    <span>{total}</span>

  );
}