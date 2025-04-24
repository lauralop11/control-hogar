"use client";
import { useState, useEffect } from "react";
import { Data } from "@app-types/types";

export default function TotalCompte({ tipo }: { tipo: string }) {
  const [data, setData] = useState<Data[] | null>(null);

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
  
  const actuallyMonth = new Date().getMonth() + 1;
  const actuallyYear = new Date().getFullYear();
  const startDate = new Date(
    actuallyYear,
    actuallyMonth - 1,
    20
  );
  const endDate = new Date(
    actuallyYear,
    actuallyMonth,
    19
  );

  const dataFiltrada = data?.filter((item) => {
    const itemDate = new Date(item.fecha);
    return itemDate >= startDate && itemDate <= endDate;
  });
  
  // Calcular el total de los gastos
  const total: number = Array.isArray(dataFiltrada)
    ? Number(
        dataFiltrada
          .reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0)
          .toFixed(2)
      )
    : 0;

  return (
      <span>{total}</span>
  );
}
