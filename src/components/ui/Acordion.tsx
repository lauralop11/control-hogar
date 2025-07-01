import { AcordeonProps, GroupeCategory} from '@app-types/types';
import BtnDelete from '@components/ui/BtnDelete';

export default function Acordeon({ data, type}: AcordeonProps) {
  
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="font-extrabold text-2xl">No hay datos disponibles</h2>
      </div>
    );
  }
  const groupeCategory: GroupeCategory[] = Object.values(data.reduce<Record<string, GroupeCategory>>((acc, item) => {
    const categoryItem = item.category;
    if (!acc[categoryItem]) {
      acc[categoryItem]= {items: [], total: 0, title: ""};
    }
    acc[categoryItem].total += Number(item.amount || 0);
    acc[categoryItem].items.push(item);
    acc[categoryItem].title = categoryItem;
    return acc;
  }, {})). map(({total, items, title}) => ({total, items, title}))

return (
  <section className="w-full px-5 flex flex-col items-center z-0">
    {groupeCategory && groupeCategory.map((category, index) => (
    <div key={index} className="collapse collapse-arrow bg-base-100 border border-base-300 font-sans my-2">
      <input type="radio" name="my-accordion-2" id={`category-${category.title}`} />
      <div className="collapse-title pe-0">
        <h3 className="flex justify-between items-center pe-12">
          <span>{(category.title).toUpperCase() }:</span>
          <span>${category.total}</span>
        </h3>
      </div>
      <div className="collapse-content text-sm ">
        <ul>
        {category.items && category.items.map((item, index) => (
          <div key={index} className="bg-blue-300/25 py-2 px-4 rounded-lg my-2">
            <li key={index} className="list-none">
              <p className="grid gap-4 grid-cols-3 justify-between items-center my-1">
                <span>{item.description}</span>
                <span className="text-right">${item.amount}</span>
                <span className="text-right text-red-700">
                <BtnDelete id={item.id} type={type} />
                </span>
              </p>
            </li>
         </div>
        ))} 
        </ul>
      </div>
    </div>
    ))}
  </section>
)
}