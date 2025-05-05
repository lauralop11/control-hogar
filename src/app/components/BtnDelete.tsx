export default function BtnDelete({id, tipo}: {id: number, tipo: string}) {
  
  async function deleteItem() {
    const res = await fetch(`/api/${tipo}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id}),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Item Eliminado correctamente!");
      window.location.reload();
    } else {
      console.error("Error: " + data.error);
    }
  }
  return (
    <span className="text-right text-red-700">
      <button type="button" onClick={ () => { deleteItem() } }>
         Borrar
      </button>
    </span>
  )
}