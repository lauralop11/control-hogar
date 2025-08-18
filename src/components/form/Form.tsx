'use client'
import { useState} from "react"
import { useCategory} from "./useCategory"
import { postCategory } from "./postNewInfo"
import { SelectForm } from "./SelectForm"
import { handleSubmit, handleSubmitCard } from "./actionsCategory"
import { initialForm, initialFormCard, FormValues, FormCardValues } from "./schema"

export function Form ({children}) {
  const {category, name} = useCategory()
  const [formData, setFormData] = useState<FormValues | FormCardValues>( category === "card" ? initialFormCard : initialForm );
  

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.currentTarget;
    const handleSubmitFn = category === "card" ? handleSubmitCard : handleSubmit;
    const initialFormFn = category === "card" ? initialFormCard : initialForm;

    const newData = await handleSubmitFn(e);
    if (!newData) return;

    setFormData(newData);
    await postCategory({ category, formData });
    formElement.reset();
    setFormData(initialFormFn());
  }
  
  return (
    <>
      <h3 className="text-center pb-3 font-bold">Agregar {name}</h3>
      <form onSubmit={onSubmit} className="lg:w-[50%] flex flex-col gap-4 z-10 text-black">
        {children} 
        {
        category !== 'card'? <SelectForm category={category}/> :
          <label className="flex flex-col gap-2 items-center">
              <span className="text-white">Seleccione el tipo de tarjeta</span>
              <div className="join">
                <input className="join-item btn" type="radio" name="genre" value="credit" aria-label="Tarjeta Credito" defaultChecked />
                <input className="join-item btn" type="radio" name="genre" value="debit"  aria-label="Tarjeta Debito" />
              </div>
          </label>
        }
        <button className="button text-white" type="submit">Guardar cambios</button>
      </form>
    </>
  
  )
}