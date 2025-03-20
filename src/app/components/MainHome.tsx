import GetAhorros from "../api/getAhorros/page";
import GetGastos from "../api/getGastos/page";
import GetIngresos from "../api/getIngresos/page";

export default function MainHome() {
  return (
    <section>
      <div className="text-income">
        <GetIngresos/>
      </div>
      <div className="text-expenses">
        <GetGastos/>
      </div>
      <div className="text-savings">
        <GetAhorros/>
      </div>
    </section>
  );
}