"use client";
import { useState, useEffect } from "react";
import { getDataFilter} from "@lib/getData";
import { Data } from "@app-types/types";

export default function TotalForCategory({ type }: { type: string }) {
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      getDataFilter(type).then(setData);
    };
    fetchData();
  }, [type]);
  
  // Total for all items
  const total: number = Array.isArray(data)
    ? Number( data .reduce((acc, item) => acc + Number(item.amount || 0), 0)
          .toFixed(2)): 0;
  return (
    <>
      <span>$ {total}</span>
    </>
      
  );
}
