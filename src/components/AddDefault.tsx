'use client'
import { useEffect, useState } from "react";
import postExpenses from "@lib/postExpenses";
import { Form, Data } from '@app-types/types';

export default function AddDefault ({data}: {data: Data[] | null}) {
  const [form, setForm] = useState<Form>({
    description: '',
    amount: 0,
    category: '',
    card: '',
  });
  useEffect(() => {
    const day = new Date().getDate();
    // Definir los expenses predeterminados para cada día
    const expensesForDays: Record<number, Form> = {
      1: { description: "arriendo", amount: 1406, category: "fijos", card: "dejardins debito" },
      3: { description: "seguro casa", amount: 35.69, category: "fijos", card: "dejardins debito" },
      4: { description: "seguro moto", amount: 17, category: "fijos", card: "dejardins debito" },
      22: { description: "seguro carro", amount: 96, category: "fijos", card: "dejardins debito" },
    };

    // Verificar si el día actual tiene expenses predeterminados
    const expenses = expensesForDays[day];
    const validateItem = data?.findIndex((item) => item.description === expenses.description);

    // Guardar en el localStorage si no existe
    if (validateItem === -1 ) {
      // Guardar el gasto en la base de datos
      postExpenses(form).then((res) => {
        if (res.ok) { setForm({
          description: '',
          amount: 0,
          category: '',
          card: '',
          });    
        } 
      });
    } 
  }, [form, data]);

  return null;
}