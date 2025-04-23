'use cliente';
import { useState, useEffect } from "react";
import { CardCreate } from "@app-types/types";

export default function OptCardGasto() {

  const [data, setData] = useState<CardCreate[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/createCard');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <option value="" disabled>Seleccione</option>
      {
        data?.map ((item: CardCreate) => (
          <option key={item.id} value={item.nombre}>{item.nombre} {item.tipo} </option>
        ))
      }
    </>
  )

}