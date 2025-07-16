import { PropsForm } from '@app-types/types';
import Swal from 'sweetalert2';
export async function postCategory ({category, formData, setFormData}: {category:string, formData:PropsForm, setFormData:(data:PropsForm) => void}) {
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
  setFormData({ description: '', amount: 0, category: '', card: '' });
}