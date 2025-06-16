import Link from "next/link";

export default  function BtnAddContent () {
  const items = [
    { name: "Agregar Gasto", link: "/formAdd/gastos", color:"bg-income"},
    { name: "Agregar Ingresos", link: "/formAdd/ingresos", color:"bg-expenses" },
    { name: "Info Tarjetas", link: "/formCard", color:"bg-savings"},
  ]
  
  return (
    <section className= "mx-5 flex gap-5 justify-between items-center">
      { items.map((item, index) => (
        <Link key={index} href={item?.link || "#"} className={`${item?.color} text-white text-sm h-20 w-25 md:hover:scale-105 rounded-md flex flex-col-reverse justify-center items-center`}>
          <span className="text-center">{item?.name}</span>
        </Link>
      ))
      }
    </section>
   
  )
}