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
  const colors = {
    savings: "text-savings",
    expenses: "text-expenses",
    income: "text-income",
  }
  const color: string = colors[category] || "text-black";

  const names = {
    savings: "Ahorro",
    expenses: "Gasto",
    income: "Ingreso",
  };
  const name = names[category] || "valor";

  return(
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <section>
        <h2 className={`${color} font-bold text-xl text-center mb-5`}>Agregar {name}</h2>
        <FormAdd category={category} name={name}/>
      </section> 
    </>
    
  )
  
}