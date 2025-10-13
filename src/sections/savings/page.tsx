import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { ArrowTrendingDownIcon } from "@heroicons/react/24/solid";
import { getData } from "@lib/getData";
import { useEffect, useState } from "react";

export default function SavingsPage() {
  // eslint-disable-next-line
  const [savings, setSavings] = useState<any[] | null>(null);

  useEffect(() => {
    const getSavings = async () => {
      /* Quede aca, debo obtener los datos, crear uno de prueba pendiente para luego mostrarlos */
      getData("savings").then((data) => {
        setSavings(data);
        console.log("savings", savings);
      });
    }
    getSavings();
  }, []);

  return (
    <section className="savings-section bg-test h-screen -mt-[10px]">
      <div className="section-content backdrop-blur-sm h-screen w-screen p-4 text-neutral-50">
        <div className="section-title text-3xl flex justify-between">
          <span>Ahorros</span>
          <span>$515.49</span>
        </div>
        <div className="savings-list py-4 flex flex-col gap-4">
          <div className="saving p-4 bg-neutral-300/10 rounded-xl">
            <p className="text-2xl">Inversion Fondos Mutuos RBC</p>
            <p className="text-sm">Último aporte 22 May 2025 ($500.00)</p>
            <p className="text-sm mb-2">Última actualización 2 Jul 2025</p>
            <p className="text-sm flex gap-1">
              Ganancias o pérdidas: + $15.49 <ArrowTrendingUpIcon className="w-5 text-green-300" />
            </p>
            <p className="text-xl">Total: $515.49</p>
          </div>

          <div className="saving p-4 bg-neutral-300/10 rounded-xl">
            <p className="text-2xl">Inversion Fondos Mutuos RBC</p>
            <p className="text-sm">Último aporte 22 May 2025 ($500.00)</p>
            <p className="text-sm mb-2">Última actualización 2 Jul 2025</p>
            <p className="text-sm flex gap-1">
              Ganancias o pérdidas: - $10.00 <ArrowTrendingDownIcon className="w-5 text-red-300" />
            </p>
            <p className="text-xl">Total: $490.00</p>
          </div>
        </div>
      </div>
    </section>
  )
}