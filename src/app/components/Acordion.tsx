
type Data = {
  tarjeta: string;
  monto: string | number;
  descripcion: string;
  categoria: string;
};

type AcordeonProps = {
  nameCard: string;
  data: Data[];
};

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
  const mercado = categoriasItem['mercado'] || { total: 0, items: [] };
  const carro = categoriasItem['carro'] || { total: 0, items: [] };
  const otro = categoriasItem['otro'] || { total: 0, items: [] };

  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300 font-sans">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title">
        <h3>Tarjeta {nameCard} total: ${totalCard}</h3>
      </div>
      <div className="collapse-content text-sm">
        <div>
          <h3 className="font-bold underline-offset-1 text-base text-primary my-2">Mercado ${mercado.total}</h3>
          {mercado.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p>{item.descripcion} - ${item.monto}</p>
            </li>
          ))}
        </div>
        <div>
          <h3 className="font-bold underline-offset-1 text-base text-primary my-2">Carro ${carro.total}</h3>
          {carro.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p>{item.descripcion} - ${item.monto}</p>
           </li>
          ))}
        </div>
        <div>
          <h3 className="font-bold underline-offset-1 text-base text-primary my-2">Otros ${otro.total}</h3>
          {otro.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p>{item.descripcion} - ${item.monto}</p>
           </li>
          ))}
        </div>
      </div>
    </div>
  );
}