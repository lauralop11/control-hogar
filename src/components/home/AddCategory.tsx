import { BtnAdd }from "@components/ui";

export function AddCategory () {
  const items = [
    { name: "Agregar Gasto", link: "/pageAddCategory/expenses"},
    { name: "Agregar Ingreso", link: "/pageAddCategory/income"},
    { name: "Info Tarjetas", link: "/pageCard"},
  ]
  return (
    <section className= "m-5 flex gap-5 justify-between md:justify-center items-center">
      { items.map((item, index) => (
        <BtnAdd key={index} props={item}/>
      ))
      }
    </section>
   
  )
}