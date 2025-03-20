import Acordion from '@components/Acordion';
import TotalCostco from "../api/totalCostco/page";
import TotalMercado from "../api/totalMercado/page";

export default function Gastos() {
  return (
    <div>
      <h2>Gastos</h2>
      <Acordion Component1={TotalCostco} Component2={TotalMercado} />
      <Acordion Component1={TotalCostco} Component2={TotalMercado} />
      <Acordion Component1={TotalCostco} Component2={TotalMercado} />
    </div>
  );
}