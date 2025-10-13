import Swal from 'sweetalert2';
import { schema, schemaCard } from './schema'

export async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
  const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
  const result = schema.safeParse(formData);
  console.log("Datos del formulario:", formData);
  console.log("Resultado de la validación:", result);
  if(!result.success){
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "No se ingreso todos los datos."
      });
   return;
  } 
  return result.data;
} 

export async function handleSubmitCard (e: React.FormEvent<HTMLFormElement>) {
  const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
  const result = schemaCard.safeParse(formData);
  if(!result.success){
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "No se ingreso todos los datos."
      });
   return;
  } 
  return result.data;
} 