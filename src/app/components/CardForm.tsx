'use client'
import { useState } from 'react';
import {CardCreate} from '@app-types/types';

export default function CardForm() {

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState <CardCreate> ({
    nombre:'',
    fecha_inicio: today,
    fecha_fin: today,
    color: '#000000',
    tipo: 'credito',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, 
      [e.target.name]: e.target.name === "nombre"? (e.target.value).toLowerCase() :  e.target.value});
  }; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nombre || !form.fecha_inicio || !form.fecha_fin || !form.color ) {
      alert("Todos los campos son obligatorios");
      return;
    } 
    try {
      const res = await fetch(`/api/createCard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          fecha_inicio: form.fecha_inicio,
          fecha_fin: form.fecha_fin,
          color: form.color,
          tipo: form.tipo,
        }),
      });
      if (res.ok) {
        alert(`Tarjeta de ${form.tipo} agregada`);
        setForm({  nombre:'', fecha_inicio: today, fecha_fin: today, color: '#000000', tipo: 'credito' });
      } 
    } catch (error) {
      console.error("Error en fetch:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%] m-auto flex flex-col justify-between gap-4 text-primary z-10">
      <label className="input">
        <span className="label">Entidad financiera: </span>
        <input type="text" placeholder="Dejardins" name="nombre" value={form.nombre} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Fecha inicio del ciclo</span>
        <input type="date"  className="input input-md" name="fechaInicio" value={form.fecha_inicio} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Fecha fin del ciclo</span>
        <input type="date"  className="input input-md" name="fechaFin" value={form.fecha_fin} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Color tarjeta</span>
        <input type="color"  className="input input-md" name="color" value={form.color} onChange={handleChange}/>
      </label>
      <label className="flex flex-col gap-2 items-center">
        <span>Escoje que tipo de tarjeta vas a agregar</span>
        <div className="join">
          <input className="join-item btn" type="radio" name="tipo" value="credito" aria-label="Tarjeta credito" onChange={handleChange} defaultChecked />
          <input className="join-item btn" type="radio" name="tipo" value="debito"  aria-label="Tarjeta debito" onChange={handleChange}/>
        </div>
      </label>
      <button className= "bg-primary p-3 rounded-md text-white" type="submit">Agregar tarjeta</button>
    </form>
  )
}