import Acordion from '@components/Acordion';
import GetIngresos from "../api/GetIngresos/page";
import GetGastos from "../api/GetGastos/page";

export default function Gastos() {
  return (
    <div>
      <h2>Gastos</h2>
      <Acordion Component1={GetIngresos} Component2={GetGastos} />
      <Acordion Component1={GetIngresos} Component2={GetGastos} />
      <Acordion Component1={GetIngresos} Component2={GetGastos} />
    </div>
  );
}