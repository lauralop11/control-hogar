import {Data} from "@app-types/types";
export async function getDataFilter(tipo: string) {
  const res = await fetch(`/api/${tipo}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();

  const actuallyMonth = new Date().getMonth() + 1;
  const actuallyYear = new Date().getFullYear();
  const startDate = new Date(actuallyYear, actuallyMonth - 1, 20);
  const endDate = new Date(actuallyYear, actuallyMonth,19);

  const dataFilter: Data[] = (data || []).filter((item) => {
  const itemDate = new Date(item.fecha);
  return itemDate >= startDate && itemDate <= endDate;
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