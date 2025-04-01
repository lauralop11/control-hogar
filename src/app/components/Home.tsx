import TotalAhorro from "./TotalAhorro";
import TotalGasto from "./TotalGasto";
import TotalIngreso from "./TotalIngreso";

export default function Home() {

  return (
    <ul className=" grid grid-rows-3 w-full p-4 gap-10 items-center h-[calc(100dvh-200px)]">
      <li className="bg-savings text-lg text-white h-20 rounded-lg flex justify-center items-center">
        <span>Total ahorro: $ <TotalAhorro /></span>
      </li>
      <li className="bg-expenses text-lg text-white h-20 rounded-lg flex justify-center items-center">
      <span>Total gasto: $ <TotalGasto/> </span> 
      </li>
      <li className="bg-income text-lg text-white h-20 rounded-lg flex justify-center items-center">
        <span>Total ingreso: $ <TotalIngreso /></span>
      </li>
    </ul>
  );
}