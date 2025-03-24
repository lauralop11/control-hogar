"use client";
import { useState, useEffect } from "react";

export default function TotalIngreso() {
  const [data, setData] = useState(null);

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
  const total = Array.isArray(data)
    ? data.reduce((suma, item) => suma + Number(item.monto || 0), 0)
    : 0; 

  return (
    <span>{total}</span>

  );
}