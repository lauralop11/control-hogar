"use client";
import { useState, useEffect } from "react";
import { getDataFilter} from "@lib/getData";
import { Data } from "@app-types/types";

export default function TotalCompte({ tipo }: { tipo: string }) {
  const [data, setData] = useState<Data[] | null>(null);
// Llamado api
  useEffect(() => {
    const fetchData = async () => {
      getDataFilter(tipo).then(setData);
    };
    fetchData();
  }, [tipo]);
  
  // Calcular el total de los gastos
  const total: number = Array.isArray(data)
    ? Number( data .reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0)
          .toFixed(2)): 0;
  return (
      <span>{total}</span>
  );
}
