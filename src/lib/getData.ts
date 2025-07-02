import {Data} from "@app-types/types"; 

export async function getDataFilter(type: string) {
  const res = await fetch(`/api/${type}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const dataFilter: Data[] = (data || []).filter((item) => {
  const itemDate = new Date(item.date);
  if (isNaN(itemDate.getTime())) {
      console.warn("❌ Fecha inválida ignorada:", item.date);
      return false;
    }
  const itemYear = itemDate.getFullYear();
  const itemMonth = itemDate.getMonth();
  return itemYear === currentYear && itemMonth === currentMonth ;
});
  console.log("📦 Datos filtrados:", dataFilter);
  return dataFilter;
}

export async function getData(type: string) {
  const res = await fetch(`/api/${type}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();
  return data;
}
