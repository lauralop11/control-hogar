'use client';
import { useState, useEffect } from "react";
import { getCard } from "services/getCard";
import { CardCreate } from "@app-types/types";

export function OptionCard() {
  const [data, setData] = useState<CardCreate[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      getCard().then(setData);
     };
      fetchData();
    }, []);

  return (
    <>
      <option value="" disabled>Seleccione</option>
      {
        data?.map ((item: CardCreate) => (
          <option key={item.id} value={item.name} className="text-lg">{item.name} {item.genre} </option>
        ))
      }
    </>
  )

}