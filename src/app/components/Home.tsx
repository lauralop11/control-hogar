/* import {GetAhorros} from "@api/GetAhorros/page";
import GetGastos from "@api/GetGastos/page";
import GetIngresos from "@api/GetIngresos/page";

export default function Home() {
  return (
    <section>
      <div className="text-income">
        <GetIngresos/>
      </div>
      <div className="text-expenses">
        <GetGastos/>
      </div>
      <div className="text-savings">
        <GetAhorros/>
      </div>
    </section>
  );
} */
"use client"; // Asegura que el código se ejecute en el cliente

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getAhorros");
        const json = await res.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Gastos por Categoría</h2>
    </div>
  );
}