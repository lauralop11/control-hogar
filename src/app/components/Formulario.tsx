'use client'
import { useState } from 'react';

type Formulario = {
  descripcion: string;
  monto: string | number;
  categoria: string;
  tarjeta: string;
} 

export default function AgregarDatos()  {

  const [form, setForm] = useState<Formulario> ({
    descripcion: "",
    monto: "",
    categoria: "mercado",
    tarjeta: "costco",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.descripcion || !form.monto || !form.categoria || !form.tarjeta) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const res = await fetch("/api/getGastos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Gasto agregado");
      setForm({descripcion: "", monto: "", categoria: "", tarjeta: ""})
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[50%] flex flex-col justify-center items-center gap-4">
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input className="border-zinc-100 border-1 text-primary" type="text" id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange}/>
      </div>
      <div >
        <label htmlFor="monto">Monto:</label>
        <input className="border-zinc-100 border-1" type="number" id="monto" name="monto" value={form.monto} onChange={handleChange}/>
      </div>
      <select className="select" name="categoria" value={form.categoria} onChange={handleChange}>
        <option value="mercado">Mercado</option>
        <option value="carro">Carro</option>
        <option value="otro">Otro</option>
      </select>
      <select className="select" name="tarjeta" value={form.tarjeta} onChange={handleChange}>
        <option value="costco">Costco</option>
        <option value="dejardins">Dejardins</option>
        <option value="cibc">Cibc</option>
      </select>
      <button className="bg-expenses p-3 rounded-md text-white" type="submit">Agregar Gasto</button>
    </form>
  );

}

