export async function getCard(){
  const res = await fetch(`/api/card`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();
  return data;
}
