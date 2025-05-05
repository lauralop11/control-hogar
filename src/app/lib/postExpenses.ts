import {Formulario} from "@app-types/types"

export default async function postExpenses(body: Formulario){

  const res = await fetch ("api/gastos", {
    method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Error al agregar gasto");
  } else {
    return res;
  }

}
