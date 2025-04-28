import { Data } from "@app-types/types";

type Categoria = {
  categoria: string;
  total: number;
}
export default function BudgetLimite ({data}: {data: Data[] | null}) {
  const categorias: Categoria[] = Object.values((data || []).reduce((acumulado: Record <string, Categoria>, item) => {
      if(!acumulado[item.categoria]){
        acumulado[item.categoria] = {
          categoria: item.categoria,
          total: 0,
        }
        acumulado[item.categoria].total += parseFloat(Number(item.monto || 0).toFixed(2));
      }
      return acumulado;
    }, {})).map(({categoria, total}) => ({
      categoria,
      total,
    }));
 
  console.log(categorias);

 return (
  <section className="bg-gray-50 rounded-lg p-5 shadow-md w-[300px]">
    <h3 className="font-extrabold text-2xl">Limite de gastos</h3>
    <div className="flex flex-col gap-4 mt-3">
      {categorias.map((categoria, index) => (
        <div key={index} className="flex items-center gap-3">
          <span>{(categoria.categoria).toUpperCase()}</span>
          <span className={(categoria.categoria === "mercado" && categoria.total < 400) ||(categoria.categoria === "carro" && categoria.total < 140) || categoria.categoria === "otro"? "text-green-500" : "text-red-500"

          } >{categoria.total}</span>
        </div>
      ))}
     
    </div>
  </section>
 )
}