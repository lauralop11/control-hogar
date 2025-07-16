'use client';
import {useParams} from "next/navigation";
import BtnReturn from "@components/ui/BtnReturn";
import Form from "@components/form/Form";

type Params ={
  category: string;
}
export default function PageFormAdd() {
  const params = useParams() as Params;
  const {category} = params;
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
        <h2 className='font-bold text-xl text-center mb-5'>Agregar {name}</h2>
        <Form category={category} name={name}/>
      </section> 
    </> 
  ) 
}