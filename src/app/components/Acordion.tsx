
type Data = {
  tarjeta: string;
  monto: string | number;
  descripcion: string;
  categoria: string;
};

type AcordeonProps = {
  data: Data[];
};

export default function Acordeon({ data }: AcordeonProps) {


  const tarjetasAgrupadas = Object.values(
    data.reduce((acc, obj) => {
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
    categoria: Object.entries(categoria).map(([categoria, items]) => ({
        categoria,
        items,
        total: items.reduce((suma, item) => suma + Number(item.monto || 0), 0),
    })),
}));


console.log(tarjetasAgrupadas);

  return (
    <div className="bg-base-100 border border-base-300 font-sans text-xl">
     
      {tarjetasAgrupadas.map((tarjeta, index) => {
         return(
         <div key={index} className=" pe-0">
            <h3>Tarjeta {tarjeta.tarjeta} total: ${tarjeta.total}</h3>
          </div>
          ) 
        
      })}
    
      
    
        
     
    {/*   <div className="collapse-content text-lg">
        <div>
          <h3 className="font-bold underline-offset-1 text-base text-primary">Mercado ${mercado.total}</h3>
          {mercado.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p>{item.descripcion} - ${item.monto}</p>
            </li>
          ))}
        </div>
        <div>
          <h3 className="font-bold underline-offset-1 text-base text-primary">Carro ${carro.total}</h3>
          {carro.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p>{item.descripcion} - ${item.monto}</p>
           </li>
          ))}
        </div>
        <div>
          <h3 className="font-bold underline-offset-1 text-base text-primary">Otros ${otro.total}</h3>
          {otro.items.map((item, index )=> (
            <li key={index} className="list-none">
              <p>{item.descripcion} - ${item.monto}</p>
           </li>
          ))}
        </div>
      </div>   */}
    </div>
  );
}