import { PropsForm } from "@app-types/types"
import Swal from 'sweetalert2';
export async function handleSubmit (e: React.FormEvent<HTMLFormElement>, setData:(data:PropsForm) => void) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)

  const fields = {
    description: formData.get('description') as string,
    amount: parseInt(formData.get('amount') as string),
    category: formData.get('category') as string,
    card: formData.get('card') as string,
  } 

  if(!fields.description || !fields.amount || !fields.category || !fields.card){
    Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "No se ingreso todos los datos."
          });
          return;
  }
  setData(fields)
} 