import Swal from 'sweetalert2';
import { FormValues, FormCardValues } from './schema'

interface Props {
  formData: FormCardValues | FormValues,
  category: string
}

export async function postCategory ({formData, category}: Props) {
  console.log("Datos a enviar:", formData);
  try {
    const response = await fetch (`/api/${category}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
        Swal.fire({
        icon: "success",
        title:`Se ha guardado con exito`,
        showConfirmButton: false,
        timer: 2000,
      });
      } 
    } catch (error) {
      console.error(error)
    }
}