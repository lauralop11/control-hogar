'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getData} from "@lib/getData";
import { Data} from "@app-types/types";
import PageOptions from "@components/PageOptions";

type Params = {
  tipo: string;
}
export default function Page() {
const params = useParams() as Params;
const {tipo} = params;

const [data, setData] = useState< Data[] | null >(null);

useEffect(()=>{
  const fetchData = async () => {
    getData(tipo).then(setData);
  }
  fetchData();    
},[tipo]);

const actuallyMonth = new Date().getMonth() + 1;
const actuallyYear = new Date().getFullYear();
const startDate = new Date(actuallyYear, actuallyMonth - 1, 20);
const endDate = new Date(actuallyYear, actuallyMonth,19);

const dataFiltrada: Data[] = (data || []).filter((item) => {
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
  <PageOptions data={dataFiltrada} tipo={tipo} total={total}/>
);
}