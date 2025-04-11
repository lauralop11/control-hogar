"use client";
import { useState, useEffect } from "react";
import {Data} from "../types/types";

export default function TotalGasto({tipo}: {tipo : string}) {

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
 
  const total: number = Array.isArray(data)
    ? Number(data.reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0).toFixed(2))
    : 0; 

  return (
    <span>{total}</span>

  );
}