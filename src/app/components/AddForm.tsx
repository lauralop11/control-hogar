'use client'
import { useState } from 'react';

type Formulario = {
  descripcion: string;
  monto: string | number;
  categoria: string;
  tarjeta: string;
};

type Props ={
  tabla: string;
  color: string;
}

export default function AddForm({tabla, color}: Props)  {

  const [form, setForm] = useState<Formulario> ({
    descripcion: "",
    monto: "",
    categoria: "",
    tarjeta: "",
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
    const res = await fetch(`/api/${tabla}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert(`${tabla} agregado`);
      setForm({descripcion: "", monto: "", categoria: "", tarjeta: ""})
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%] m-auto flex flex-col justify-between gap-4 text-primary">
      <label className="input">
        <span className="label">Descripción: </span>
        <input type="text" placeholder="Cafecito" name="descripcion" value={form.descripcion} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Monto: $</span>
        <input type="text" placeholder="20.00" className="input input-md" name="monto" value={form.monto} onChange={handleChange}/>
      </label>
      <label className="select">
        <span className="label">Categoria gasto</span>
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="mercado">Mercado</option>
          <option value="carro">Carro</option>
          <option value="otro">Otro</option>
        </select>
      </label>
      <label className="select">
        <span className="label">Tarjeta</span>
        <select className="select w-[50%]" name="tarjeta" value={form.tarjeta} onChange={handleChange}>
          <option value="costco">Costco</option>
          <option value="dejardins">Dejardins</option>
          <option value="cibc">Cibc</option>
        </select>
      </label> 
      <button className={`bg-${color} p-3 rounded-md text-white`} type="submit">Agregar Gasto</button>
    </form>
  );

}

