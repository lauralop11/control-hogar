'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDataFilter} from "services/getData";
import { Data} from "@app-types/types";
import Acordion from "@components/ui/Acordion";
import TotalForCategory from "@components/TotalForCategory";
import BtnReturn from "@components/ui/BtnReturn";

type Params = {
  type: string;
}
export default function Page() {
const params = useParams() as Params;
const {type} = params;

const [data, setData] = useState< Data[] | null >(null);

useEffect(()=>{
  const fetchData = async () => {
    getDataFilter(type).then(setData);
  }
  fetchData();    
},[type]);

const names = {
    savings: "Ahorro",
    expenses: "Gastos",
    income: "Ingreso",
  };
const name = names[type] || "valor";

return (
  <>
    <div className="absolute top-3 right-4">
      <BtnReturn/>
    </div>
    <section className="flex flex-col items-center">
      <h2 className="text-2xl flex gap-4 justify-center items-center">
          {name.toUpperCase()} <TotalForCategory type={type} />
      </h2>
      <Acordion data={data} type={type}/>
    </section>
  </>

);
}

