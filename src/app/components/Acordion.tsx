
type Data = {
  tarjeta: string;
  monto: string | number;
  descripcion: string;
  categoria: string;
};

type AcordeonProps = {
  data: Data[];
};

type TarjetaAgrupada= {
  tarjeta: string;
  total: number;
  categoria:{
    categoria: string;
    items: Data[];
    total: number;
  }[] ;
};

type Tarjeta = {
tarjeta:string;
total:number;
categoria: Record <string, Data[]>;
};


export default function Acordeon({ data }: AcordeonProps) {

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
        console.log(acc);
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
  <div>
  {tarjetasAgrupadas && tarjetasAgrupadas.map((tarjeta) => (
    <div key={tarjeta.tarjeta} className="collapse collapse-arrow bg-base-100 border border-base-300 font-sans text-xl">
      <input type="radio" name="my-accordion-2" id={`tarjeta-${tarjeta.tarjeta}`} />
      <div className="collapse-title pe-0">
        <h3>Tarjeta {tarjeta.tarjeta} total: ${tarjeta.total}</h3>
      </div>
      <div className="collapse-content text-lg ">
        {tarjeta.categoria && tarjeta.categoria.map((categoria, index) => (
          <div key={index}>
            <h3 className="font-bold text-base text-primary my-2"> {categoria.categoria} ${categoria.total} </h3>
            <ul>
              {categoria.items && categoria.items.map((item, index) => (
                <li key={index} className="list-none">
                  <p>{item.descripcion} - ${item.monto}</p>
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