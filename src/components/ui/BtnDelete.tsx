import Swal from 'sweetalert2';

export function BtnDelete({id, type}: {id: number, type: string}) {
  
  async function deleteItem() {
    
    const res = await fetch(`/api/${type}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id}),
    });
    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        icon: "success",
        title:`Se ha borrado correctamente`,
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.reload();
    } else {
      console.error("Error: " + data.error);
    }
  }
  return (
    <span className="text-right">
      <button type="button" onClick={ () => { deleteItem() } }>
         Borrar
      </button>
    </span>
  )
}