import { PieData } from "@app-types/types";

export default function BudgetLimite({ data }: { data: PieData[] | null }) {

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <section className="bg-gray-50 rounded-lg p-5 shadow-md w-[300px]">
       <h3 className="font-extrabold text-2xl">Limite de gastos</h3>
      <div className="flex flex-col gap-4 mt-3">
        {data.map((categoria, index) => (
          <div key={index} className="flex items-center gap-3">
            <span>{categoria.name.toUpperCase()}</span>
            <span
              className={
                (categoria.name === "mercado" && categoria.value < 400) ||
                (categoria.name === "carro" && categoria.value < 140) ||
                categoria.name === "otro"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {(categoria.value).toFixed(2)}
            </span>
          </div>
        ))}
      </div> 
    </section>
  );
}
