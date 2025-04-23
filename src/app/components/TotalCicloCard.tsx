'use client';
import {CardCreate, TarjetaAgrupada} from "@app-types/types";
import { useState, useEffect } from "react";

type TotalCicloProps = {
  data: TarjetaAgrupada;
}
export default function TotalCicloCard({data}: TotalCicloProps) {
  console.log("data", data);
  
  const [card ,setCard] = useState<CardCreate []| null>(null);
  // Fetch de la tabla tarjeta
  useEffect (() => {
    const fecthData = async () => {
      try {
        const res = await fetch ('/api/createCard');
        const json = await res.json();
        setCard(json);
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fecthData();
  },[data.tarjeta]);
  //Filtrar la tarjeta de la tabla tarjeta por el nombre
   const cardData = card ?.find((item) => item.nombre === data.tarjeta);
   console.log("cardData", cardData);
  // Fechas de inicio y fin del ciclo segun la tarjeta
   const startDate = new Date(cardData?.fecha_inicio ?? new Date());
   const endDate = new Date(cardData?.fecha_fin ?? new Date());
  // Filtrar los items de la tarjeta por fecha
  const cardValues = data.categoria.flatMap(categoria => {
    return (categoria.items.filter(item =>{
      const itemDate = new Date(item.fecha);
      return (itemDate >= startDate && itemDate <= endDate)
    } ))
  } );
  // Calcular el total del ciclo
   const totalCiclo = cardValues.reduce ((suma, item) => 
    suma + Number(item.monto || 0), 0);
  return (
   
      <span>Ciclo {data.tarjeta} saldo a pagar {totalCiclo}</span>
    
  )
}