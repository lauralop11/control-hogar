'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDataFilter} from "@lib/getData";
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
    getDataFilter(tipo).then(setData);
  }
  fetchData();    
},[tipo]);

// Calcular el total de los gastos
const total: number = Array.isArray(data)
  ? Number(
      data
        .reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0)
        .toFixed(2)
    )
  : 0;

return (
  <PageOptions data={data} tipo={tipo} total={total}/>
);
}