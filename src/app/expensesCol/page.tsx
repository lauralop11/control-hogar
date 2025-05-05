"use client";
import {useEffect, useState} from "react";
import Colombia from "@components/Colombia";
import {GastosCol} from "@app-types/types";


export default function PageColombia () {
  const [data,setData] = useState <GastosCol[] | null>(null);
  useEffect (()=> {
    const getData = async () => {
      const res = await fetch ('/api/colombia');
      const items = await res.json();
      setData(items)
    };
    getData();
  },[]);
  return (
    <section className="m-2 flex flex-col place-items-center">
     <Colombia data= {data}/>
    </section>
    
  )
}