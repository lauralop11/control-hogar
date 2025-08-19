'use client'
import { useCategory} from "./useCategory"
import { postCategory } from "./postNewInfo"
import { SelectForm } from "./SelectForm"
import { handleSubmit, handleSubmitCard } from "./actionsCategory"

export function Form ({children}) {
  const {category, name} = useCategory()
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.currentTarget;
    // Determine wich function to use based on category
    const handleSubmitFn = category === "card" ? handleSubmitCard : handleSubmit;
    // Get the new data from the form
    const newData = await handleSubmitFn(e);
    if (!newData) return;
    // Post th data
    await postCategory({ formData: newData, category })
    // Reset the form 
    formElement.reset();
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