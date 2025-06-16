import TotalCompte from "./TotalCompte";

export default function Home() {
  const tablas: string[] = ["gastos", "ahorros", "ingresos"];

  const colores = {
    ahorros: "bg-savings",
    gastos: "bg-expenses",
    ingresos: "bg-income",
  }

  return (
    <ul className=" grid grid-rows-3 w-full p-4 gap-10 md:gap-2 md:h-[20rem] items-center h-[calc(100dvh-200px)]">
      {
        tablas.map((tabla) => (
          <li key={tabla} className={`${colores[tabla]} text-xl text-white h-20 rounded-lg flex justify-center items-center`}>
            <span>Total {tabla} $ <TotalCompte tipo={tabla}/></span>
          </li>
        ))  
      }
    </ul>
  );
}