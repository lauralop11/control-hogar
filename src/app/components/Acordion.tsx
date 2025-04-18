import { AcordeonProps, Tarjeta, TarjetaAgrupada, Data } from '../types/types';

export default function Acordeon({ data, tipo }: AcordeonProps) {

  async function deleteItem(id: number) {
    const res = await fetch(`api/${tipo}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id}),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Gasto Eliminado correctamente!");
      window.location.reload();
    } else {
      console.error("Error: " + data.error);
    }
  }
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="font-extrabold text-2xl">No hay datos disponibles</h2>
      </div>
    );
  }
  const tarjetasAgrupadas:TarjetaAgrupada[] = Object.values(
    data.reduce((acc: Record<string, Tarjeta>, obj) => {
        const key = obj.tarjeta;
        // Agrupar por tarjeta
        if (!acc[key]) {
            acc[key] = { tarjeta: key, categoria: {}, total: 0 };
        }
        // Se suma el monto total de la tarjeta
        acc[key].total += Number(obj.monto || 0);

        // Agrupar por categoría dentro de cada tarjeta
        const categoriaKey = obj.categoria;
        if (!acc[key].categoria[categoriaKey]) {
            acc[key].categoria[categoriaKey] = [];
        }
        acc[key].categoria[categoriaKey].push(obj);
        return acc;
    }, {})
).map(({ tarjeta, categoria, total }) => ({
    tarjeta,
    total,
    categoria: Object.entries(categoria).map(([categoria, items]: [string, Data[]]) => ({
        categoria,
        items,
        total: items.reduce((suma, item) => suma + Number(item.monto || 0), 0),
    })),
}));
console.log(tarjetasAgrupadas);

return (
  <div className=" flex flex-col items-center">
  {tarjetasAgrupadas && tarjetasAgrupadas.map((tarjeta) => (
    <div key={tarjeta.tarjeta} className="collapse collapse-arrow bg-base-100 border border-base-300 font-sans my-2">
      <input type="radio" name="my-accordion-2" id={`tarjeta-${tarjeta.tarjeta}`} />
      <div className="collapse-title pe-0">
        <h3 className="flex justify-between items-center pe-12">
          <span>T.C. {tarjeta.tarjeta}:</span>
          <span>${tarjeta.total}</span>
        </h3>
      </div>
      <div className="collapse-content text-sm">
        {tarjeta.categoria && tarjeta.categoria.map((categoria, index) => (
          <div key={index} className="bg-blue-300/25 py-2 px-4 rounded-lg my-2">
            <h3 className="font-bold underline-offset-1 text-base text-primary  flex justify-between items-center">
              <span>{categoria.categoria}</span>
              <span>${categoria.total}</span>
            </h3>
            <ul>
              {categoria.items && categoria.items.map((item, index) => (
                <li key={index} className="list-none">
                  <p className="grid gap-4 grid-cols-3 justify-between items-center my-1">
                    <span>{item.descripcion}</span>
                    <span className="text-right">${item.monto}</span>
                    <span className="text-right text-red-700">
                      <button type="button" onClick={ () => { deleteItem(item.id) } }>
                          Borrar
                      </button>
                    </span>
                  </p>
                </li>
              ))}
            </ul>
         </div>
        ))} 
      </div>
    </div>
    ))}
  </div>

)
}