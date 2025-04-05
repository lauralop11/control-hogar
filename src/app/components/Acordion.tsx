import { DELETE } from "@api/getGastos/route";

type Data = {
  tarjeta: string;
  monto: string | number;
  descripcion: string;
  categoria: string;
  id: number;
};

type AcordeonProps = {
  nameCard: string;
  data: Data[];
};

async function deleteItem(id) {
  const params = {
    id: id
  };
  const res = await fetch("/api/getGastos", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (res.ok) {
    alert("Gasto Eliminado correctamente!");
  } else {
    console.error("Error: " + data.error);
  }
}

export default function Acordeon({nameCard, data}: AcordeonProps) {
  const card = Array.isArray(data) ? data.filter(item => item.tarjeta === nameCard) : [];
  const totalCard = Array.isArray(card) ? card.reduce((suma, item) => suma + Number(item.monto || 0), 0) : 0;

  const categoriasItem = card.reduce<Record<string, { total: number; items: Data[] }>>((suma, item) => {
    const categoria = item.categoria || 'otro';
    if (!suma[categoria]){
      suma[categoria] = { 
        total: 0, 
        items: []
      };
    }
    suma[categoria].total += Number(item.monto || 0);
    suma[categoria].items.push(item);
    return suma;
  }, {});
  console.log(categoriasItem);
  const mercado = categoriasItem['mercado'] || { total: 0, items: [] };
  const carro = categoriasItem['carro'] || { total: 0, items: [] };
  const otro = categoriasItem['otro'] || { total: 0, items: [] };

  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300 font-sans my-2">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title">
        <h3>Tarjeta {nameCard} total: ${totalCard}</h3>
      </div>
      <div className="collapse-content text-sm">
        <div className="bg-blue-300/25 py-2 px-4 rounded-lg">
          <h3 className="font-bold underline-offset-1 text-base text-primary  flex justify-between items-center">
            <span>Mercado</span>
            <span>${mercado.total}</span>
          </h3>
          {
            mercado.items.map((item, index )=> (
              <li key={index} className="list-none">
                <p className="grid gap-4 grid-cols-3 justify-between items-center my-1">
                  <span>{item.descripcion}</span>
                  <span className="text-right">${item.monto}</span>
                  <span className="text-right text-red-700"><button type="button" onClick={ () => { deleteItem(item.id) } }>Borrar</button></span>
                </p>
              </li>
            ))
          }
        </div>
        <div className="bg-blue-300/25 py-2 px-4 rounded-lg my-2">
          <h3 className="font-bold underline-offset-1 text-base text-primary  flex justify-between items-center">
            <span>Carro</span>
            <span>${carro.total}</span>
          </h3>
          {carro.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p className="grid gap-4 grid-cols-3 justify-between items-center my-1">
                <span>{item.descripcion}</span>
                <span className="text-right">${item.monto}</span>
                <span className="text-right text-red-700"><button type="button" onClick={ () => { deleteItem(item.id) } }>Borrar</button></span>
              </p>
           </li>
          ))}
        </div>
        <div className="bg-blue-300/25 py-2 px-4 rounded-lg my-2">
          <h3 className="font-bold underline-offset-1 text-base text-primary  flex justify-between items-center">
            <span>Otros</span>
            <span>${otro.total}</span>
          </h3>
          {otro.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p className="grid gap-4 grid-cols-3 justify-between items-center my-1">
                <span>{item.descripcion}</span>
                <span>${item.monto}</span>
                <span className="text-right text-red-700"><button type="button" onClick={ () => { deleteItem(item.id) } }>Borrar</button></span>
              </p>
           </li>
          ))}
        </div>
      </div>
    </div>
  );
}