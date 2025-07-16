'use client'
import { useState } from "react"
import { Input } from "./Input"
import { PropsForm } from "@app-types/types";
import { RenderForm} from "./SelectFormCategory"
import { handleSubmit } from "./actionsCategory"
import { postCategory } from "./postCategory";

export default function Form ({category, name}: {category: string; name: string}) {
  const [formData, setFormData] = useState<PropsForm> ({
      description: '', amount: 0, category: '', card: '',
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleSubmit(e, setFormData)
    postCategory({category, formData, setFormData})
  }
  return (
    <form onSubmit={onSubmit} className="w-full md:w-[50%] md:m-auto flex flex-col justify-between items-center gap-4 z-10 text-black">
      <Input type="text" name="description" placeholder="Cafecito">
        Descripcion
      </Input>
      <Input type="number" name="amount" placeholder="20.00">
        Precio
      </Input>
      <RenderForm category={category}/>
      <button className="button text-white" type="submit">Agregar {name}</button>
    </form>
  )
}