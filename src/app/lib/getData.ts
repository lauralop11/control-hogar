export async function getData(tipo: string) {
  const res = await fetch(`/api/${tipo}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();
  return data;
}