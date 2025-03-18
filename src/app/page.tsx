
import Image from "next/image";

export default function Home() {
  const date = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <header>
        <section className="mx-5 h-20 flex justify-between items-center">
          <h2 className="font-extrabold text-primary text-2xl">Informacion</h2>
          <h3>{date}</h3>
        </section>
        <section>
          <Image className="m-auto" src="/dona.png" width={300} height={300} alt="Grafica dona" />
        </section>
      </header>
      <main>
        <ul className="w-[80%] mx-auto my-9 text-lg flex flex-col gap-4">
          <li className="w- full flex justify-between items-center text-income">
            <h4 className="font-bold">Ingresos</h4>
            <p>$5000</p>
          </li>
          <li className="w- full flex justify-between items-center text-expenses">
            <h4 className="font-bold">Gastos</h4>
            <p>$3000</p>
          </li>
          <li className="w- full flex justify-between items-center text-savings">
            <h4 className="font-bold">Ahorros</h4>
            <p>$5000</p>
          </li>
        </ul>
      </main>
    
   
    </div>
  );
}
