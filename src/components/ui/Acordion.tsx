import { AcordeonProps, Card, GroupedCard, Data } from '@app-types/types';
import BtnDelete from '@components/ui/BtnDelete';

export default function Acordeon({ data, type }: AcordeonProps) {
  
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="font-extrabold text-2xl">No hay datos disponibles</h2>
      </div>
    );
  }
  // Agrupar los datos por tarjeta y categoría 
  const GroupedCard:GroupedCard[] = Object.values(
    data.reduce((acc: Record<string, Card>, obj) => {
        const key = obj.card;
        // Agrupar por tarjeta
        if (!acc[key]) {
            acc[key] = { card: key, category: {}, total: 0 };
        }
        // Se suma el amount total de la tarjeta
        acc[key].total += Number(obj.amount || 0);

        // Agrupar por categoría dentro de cada tarjeta
        const categoryKey = obj.category;
        if (!acc[key].category[categoryKey]) {
            acc[key].category[categoryKey] = [];
        }
        acc[key].category[categoryKey].push(obj);
        return acc;
    }, {})
).map(({ card, category, total }) => ({
    card,
    total,
    category: Object.entries(category).map(([category, items]: [string, Data[]]) => ({
        category,
        items,
        total: items.reduce((suma, item) => suma + Number(item.amount || 0), 0),
    })),
}));

return (
  <section className="w-full px-5 flex flex-col items-center z-0">
  {GroupedCard && GroupedCard.map((card, index) => (
    <div key={index} className="collapse collapse-arrow bg-base-100 border border-base-300 font-sans my-2">
      <input type="radio" name="my-accordion-2" id={`tarjeta-${card.card}`} />
      <div className="collapse-title pe-0">
        <h3 className="flex justify-between items-center pe-12">
          <span>T.C. {card.card}:</span>
          <span>${card.total}</span>
        </h3>
      </div>
      <div className="collapse-content text-sm">
        {card.category && card.category.map((category, index) => (
          <div key={index} className="bg-blue-300/25 py-2 px-4 rounded-lg my-2">
            <h3 className="font-bold underline-offset-1 text-base text-primary  flex justify-between items-center">
              <span>{category.category}</span>
              <span>${(category.total).toFixed(2)}</span>
            </h3>
            <ul>
              {category.items && category.items.map((item, index) => (
                <li key={index} className="list-none">
                  <p className="grid gap-4 grid-cols-3 justify-between items-center my-1">
                    <span>{item.description}</span>
                    <span className="text-right">${item.amount}</span>
                    <span className="text-right text-red-700">
                    <BtnDelete id={item.id} type={type} />
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
  </section>
)
}