import BtnAdd from "@components/ui/BtnAdd";

export default  function AddCategory () {
  const items = [
    { name: "Agregar Gasto", link: "/formAdd/expenses", color:"bg-expenses"},
    { name: "Agregar Ingreso", link: "/formAdd/income", color:"bg-income" },
    { name: "Info Tarjetas", link: "/cards", color:"bg-savings"},
  ]
  
  return (
    <section className= "mx-5 flex gap-5 justify-between items-center">
      { items.map((item, index) => (
        <BtnAdd key={index} props={item}/>
      ))
      }
    </section>
   
  )
}