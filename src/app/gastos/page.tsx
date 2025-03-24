import Acordion from '@components/Acordion';
import TotalGasto from '@components/TotalGasto';

export default function Gastos() {
  return (
    <div>
       <h2 className=" font-extrabold text-2xl text-center text-expenses mb-4">Gastos totales <TotalGasto/></h2>
      <Acordion nameCard="costco"/>
      <Acordion nameCard="dejardins"/>
      <Acordion nameCard="cibc"/>
    </div>
  );
}