import { Data } from "../types/types";
import Image from "next/image";

export default function PageSavings({ data }) {
  console.log("data in page Page savings: ");
  console.log(data);

  return (
    <div className="page-savings w-full px-4">
      <div className="graphic-chart h-[250px] bg-neutral-100 rounded-xl flex justify-center items-center my-4">
        <p>Graphica en desarrollo...</p>
      </div>
      <div className="summary-savings flex justify-between items-center my-4">
        <div className="summary-saving-item w-1/3 px-2">
          <div>
            <h4>Total de ahorros</h4>
            <p className="leading-none">$ 99.99 <span>CAD</span></p>
            <small>$ 150.500 <span>COP</span></small>
          </div>
          <button className="border rounded-lg p-1 w-full flex justify-center">
            <Image src={"/donut.svg"} width={20} height={20} alt="icono navbar"/>
          </button>
        </div>
        <div className="summary-saving-item w-1/3 px-2">
          <div>
            <h4>Ganancias mes</h4>
            <p className="leading-none">$ 99.99 <span>CAD</span></p>
            <small>$ 150.500 <span>COP</span></small>
          </div>
          <button className="border rounded-lg p-1 w-full flex justify-center">
            <Image src={"/donut.svg"} width={20} height={20} alt="icono navbar"/>
          </button>
        </div>
        <div className="summary-saving-item w-1/3 px-2">
          <div>
            <h4>Total Ganancias</h4>
            <p className="leading-none">$ 99.99 <span>CAD</span></p>
            <small>$ 150.500 <span>COP</span></small>
          </div>
          <button className="border rounded-lg p-1 w-full flex justify-center">
            <Image src={"/donut.svg"} width={20} height={20} alt="icono navbar"/>
          </button>
        </div>
      </div>
      <div className="accounts-list grid grid-cols-3 gap-4 my-4">
        <div className="account border border-neutral-100 rounded-lg p-2 relative">
          <div className="account-color absolute top-1 right-1 w-[10px] h-[10px] rounded-full bg-red-700"></div>
          <h3 className="account-name">Cuenta CELI</h3>
          <p className="account-amount">$ 560.19</p>
          <small className="account-percentage flex justify-start items-center gap-2">
            2.09 %
            <div className="w-0 h-0 
            border-l-[10px] border-l-transparent 
            border-r-[10px] border-r-transparent 
            border-t-[15px] border-t-red-500">
            </div>
          </small>
        </div>
        <div className="account border border-neutral-100 rounded-lg p-2 relative">
          <div className="account-color absolute top-1 right-1 w-[10px] h-[10px] rounded-full bg-sky-700"></div>
          <h3 className="account-name">Cuenta CELI</h3>
          <p className="account-amount">$ 560.19</p>
          <small className="account-percentage flex justify-start items-center gap-2">
            2.09 %
            <div className="w-0 h-0 
              border-l-[10px] border-l-transparent 
              border-r-[10px] border-r-transparent 
              border-b-[15px] border-b-green-500">
            </div>
          </small>
        </div>
        <div className="account border border-neutral-100 rounded-lg p-2 relative">
          <div className="account-color absolute top-1 right-1 w-[10px] h-[10px] rounded-full bg-green-700"></div>
          <h3 className="account-name">Cuenta CELI</h3>
          <p className="account-amount">$ 560.19</p>
          <small className="account-percentage flex justify-start items-center gap-2">
            2.09 %
            <div className="w-[15px] h-[5px] rounded-sm bg-neutral-300">
            </div>
          </small>
        </div>
      </div>
      <div className="objectives flex justify-between items-center">
        <div className="graphic-chart h-[100px] w-[100px] bg-neutral-100 rounded-xl flex justify-center items-center">
          <p className="text-sm text-center">Graphica en desarrollo...</p>
        </div>
        <div className="objectives-list">
          <p>Fondo de emergencia (30%)</p>
          <p>Ahorro Colombia (30%)</p>
          <p>Ahorro viajes (30%)</p>
          <p>Pensiones (30%)</p>
        </div>
      </div>
    </div>
  )
}