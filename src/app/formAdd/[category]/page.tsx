'use client';
import {useParams} from "next/navigation";
import FormAdd from "@components/addCategory/Form";
import BtnReturn from "@components/ui/BtnReturn";

type Params ={
  category: string;
}

export default function PageFormAdd() {
  const params = useParams() as Params;
  const {category} = params;
  const colores = {
    savings: "text-savings",
    expenses: "text-expenses",
    income: "text-income",
  }
  const color: string = colores[category] || "text-black";
  return(
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <section>
        <h2 className={`${color} font-bold text-xl text-center mb-5`}>Agregar {category}</h2>
        <FormAdd category={category}/>
      </section> 
    </>
    
  )
  
}