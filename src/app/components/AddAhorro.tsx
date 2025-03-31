'use client'
import { useState } from 'react';

type Formulario = {
  monto: string | number;
  cuenta: string;
} 

export default function AddAhorro()  {

  const [form, setForm] = useState<Formulario> ({
    monto: "",
    cuenta: "dejardins",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.monto || !form.cuenta) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const res = await fetch("/api/getAhorros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Ahorro agregado");
      setForm({monto: "", cuenta: ""})
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] flex flex-col justify-between gap-4 text-primary">
      <label className="input">
        <span className="label">Monto: $</span>
        <input type="text" placeholder="20.00" className="input input-md" name="monto" value={form.monto} onChange={handleChange}/>
      </label>
      <label className="select">
        <span className="label">Tarjeta</span>
        <select className="select w-[50%]" name="tarjeta" value={form.cuenta} onChange={handleChange}>
          <option value="dejardins">Dejardins</option>
          <option value="cibc">Cibc</option>
        </select>
      </label> 
      <button className="bg-savings p-3 rounded-md text-white" type="submit">Agregar Gasto</button>
    </form>
  );

}

