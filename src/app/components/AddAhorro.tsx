'use client'
import { useState } from 'react';

type Formulario = {
  monto: string | number;
  categoria: string;
  cuenta: string;
} 

export default function AddAhorro()  {

  const [form, setForm] = useState<Formulario> ({
    monto: "",
    categoria: "",
    cuenta: "dejardins",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.monto || !form.categoria || !form.cuenta) {
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
      setForm({monto: "", categoria: "", cuenta: ""})
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%] md:m-auto flex flex-col justify-between gap-4 text-primary">
      <label className="input">
        <span className="label">Monto: $</span>
        <input type="text" placeholder="20.00" className="input input-md" name="monto" value={form.monto} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Categoria:</span>
        <input type="text" placeholder="Emergencia" className="input input-md" name="categoria" value={form.categoria} onChange={handleChange}/>
      </label>
      <label className="select">
        <span className="label">Cuenta</span>
        <select className="select w-[50%]" name="cuenta" value={form.cuenta} onChange={handleChange}>
          <option value="dejardins">Dejardins</option>
          <option value="cibc">Cibc</option>
        </select>
      </label> 
      <button className="bg-savings p-3 rounded-md text-white" type="submit">Agregar Gasto</button>
    </form>
  );

}

