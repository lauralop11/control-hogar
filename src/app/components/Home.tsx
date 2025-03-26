import TotalAhorro from "./TotalAhorro";
import TotalGasto from "./TotalGasto";
import TotalIngreso from "./TotalIngreso";

export default function Home() {

  return (
    <section>
      <h2 className="text-lg font-bold py-2 ">Recuento</h2>
      <div>
        <ul>
          <li className="text-savings text-lg">
            <span>Total ahorro: $ <TotalAhorro /></span>
          </li>
          <li className="text-expenses text-lg">
          <span>Total gasto: $ <TotalGasto/> </span> 
          </li>
          <li className="text-income text-lg">
            <span>Total ingreso: $ <TotalIngreso /></span>
          </li>
        </ul>
      </div>
    </section>
  );
}