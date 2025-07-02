import BtnAdd from "@components/ui/BtnAdd";

export default  function AddCategory () {
  const items = [
    { name: "Agregar Gasto", link: "/formAdd/expenses"},
    { name: "Agregar Ingreso", link: "/formAdd/income"},
    { name: "Info Tarjetas", link: "/cards"},
  ]
  return (
    <section className= "m-5 flex gap-5 justify-between items-center">
      { items.map((item, index) => (
        <BtnAdd key={index} props={item}/>
      ))
      }
    </section>
   
  )
}