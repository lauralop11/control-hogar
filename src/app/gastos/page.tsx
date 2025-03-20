import Acordion from '@components/Acordion';
import getIngresos from "../api/getIngresos/page";
import getGastos from "../api/getGastos/page";

export default function Gastos() {
  return (
    <div>
      <h2>Gastos</h2>
      <Acordion Component1={getIngresos} Component2={getGastos} />
      <Acordion Component1={getIngresos} Component2={getGastos} />
      <Acordion Component1={getIngresos} Component2={getGastos} />
    </div>
  );
}