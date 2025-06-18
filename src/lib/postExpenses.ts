import {Form} from "@app-types/types"

export default async function postExpenses(body: Form){

  const res = await fetch ("api/expenses", {
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
