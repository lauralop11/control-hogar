import {Data} from "@app-types/types"; 

export async function getDataFilter(type: string) {
  const res = await fetch(`/api/${type}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();
  const today = new Date();
  const currentMonth = String(today.getMonth() + 1).padStart(2,"0");
  const currentYear = String(today.getFullYear());

  const dataFilter: Data[] = (data || []).filter((item) => {
  const [year, month] = String(item.date).split("-");
  return year === currentYear && month === currentMonth;
});
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
