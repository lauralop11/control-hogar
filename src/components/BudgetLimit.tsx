import { Data } from "@app-types/types";

export default function BudgetLimite({ data }: { data: Data[] | null }) {

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <section className="bg-gray-50 rounded-lg p-5 shadow-md w-[300px]">
       <h3 className="font-extrabold text-2xl">Presupuesto tope</h3>
      <div className="flex flex-col gap-4 mt-3">
        {data.map((category, index) => (
          <div key={index} className="flex items-center gap-3">
            <span>{category.category.toUpperCase()}</span>
            <span
              className={
                (category.category === "mercado" && Number(category.amount) < 400) ||
                (category.category === "carro" && Number(category.amount) < 140) ||
                category.category === "otro"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {Number(category.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div> 
    </section>
  );
}
