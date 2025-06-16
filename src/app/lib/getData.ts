import {Data} from "@app-types/types";

export async function getDataFilter(tipo: string) {
  const res = await fetch(`/api/${tipo}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const dataFilter: Data[] = (data || []).filter((item) => {
  const itemDate = new Date(item.fecha);
  const itemYear = itemDate.getFullYear();
  const itemMonth = itemDate.getMonth();
  return itemYear === currentYear && itemMonth === currentMonth ;
});
  return dataFilter;
}

export async function getData(tipo: string) {
  const res = await fetch(`/api/${tipo}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();
  return data;
}
