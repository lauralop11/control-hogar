import TotalAhorro from "./TotalAhorro";
import TotalGasto from "./TotalGasto";
import TotalIngreso from "./TotalIngreso";

export default function Home() {

  return (
    <section className="flex flex-col justify-center gap-4">
      <h2 className="text-xl font-bold mb-4">Recuento</h2>
      <div>
        <ul>
          <li className="text-savings text-lg">
            <span>Total ahorro: $ <TotalAhorro /></span>
          </li>
          <li className="text-expenses text-lg">
          <span>Total gasto: $ <TotalGasto /> </span> 
          </li>
          <li className="text-income text-lg">
            <span>Total ingreso: $ <TotalIngreso /></span>
          </li>
        </ul>
      </div>
    </section>
  );
}