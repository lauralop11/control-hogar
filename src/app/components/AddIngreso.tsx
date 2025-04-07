'use client'
import { useState } from 'react';

type Formulario = {
  descripcion: string;
  monto: string | number;
  categoria: string;
  tarjeta: string;
} 

export default function AddIngreso()  {

  const [form, setForm] = useState<Formulario> ({
    descripcion: "",
    monto: "",
    categoria: "salario",
    tarjeta: "dejardins",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.descripcion || !form.monto || !form.categoria || !form.tarjeta) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const res = await fetch("/api/getIngresos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Ingreso agregado");
      setForm({descripcion: "", monto: "", categoria: "", tarjeta: ""})
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] flex flex-col justify-between gap-4 text-primary">
      <label className="input">
        <span className="label">Descripción: </span>
        <input type="text" placeholder="primera quincena Felipe" name="descripcion" value={form.descripcion} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Monto: $</span>
        <input type="text" placeholder="20.00" className="input input-md" name="monto" value={form.monto} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Categoria:</span>
        <input type="text" placeholder="Salario" className="input input-md" name="categoria" value={form.categoria} onChange={handleChange}/>
      </label>
      <label className="select">
        <span className="label">Tarjeta</span>
        <select className="select w-[50%]" name="tarjeta" value={form.tarjeta} onChange={handleChange}>
          <option value="dejardins">Dejardins</option>
          <option value="cibc">Cibc</option>
        </select>
      </label> 
      <button className="bg-income p-3 rounded-md text-white" type="submit">Agregar Ingreso</button>
    </form>
  );

}

