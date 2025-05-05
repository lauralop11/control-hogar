'use client'
import { useEffect, useState } from "react";
import postExpenses from "@lib/postExpenses";
import { Formulario, Data } from '@app-types/types';

export default function AddDefault ({data}: {data: Data[] | null}) {
  const [form, setForm] = useState<Formulario>({
    descripcion: '',
    monto: 0,
    categoria: '',
    tarjeta: '',
  });
  useEffect(() => {
    const day = new Date().getDate();
    // Definir los gastos predeterminados para cada día
    const expensesForDays: Record<number, Formulario> = {
      1: { descripcion: "arriendo", monto: 1326, categoria: "fijos", tarjeta: "dejardins debito" },
      3: { descripcion: "seguro casa", monto: 35.69, categoria: "fijos", tarjeta: "dejardins debito" },
      4: { descripcion: "seguro moto", monto: 17, categoria: "fijos", tarjeta: "dejardins debito" },
      22: { descripcion: "seguro carro", monto: 96, categoria: "fijos", tarjeta: "dejardins debito" },
    };

    // Verificar si el día actual tiene gastos predeterminados
    const expenses = expensesForDays[day];
    const validateItem = data?.findIndex((item) => item.descripcion === expenses.descripcion);

    // Guardar en el localStorage si no existe
    if (validateItem === -1 ) {
      // Guardar el gasto en la base de datos
      postExpenses(form).then((res) => {
        if (res.ok) { setForm({
          descripcion: '',
          monto: 0,
          categoria: '',
          tarjeta: '',
          });    
        } 
      });
    } 
  }, [form, data]);

  return null;
}