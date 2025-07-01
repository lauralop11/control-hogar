"use client"
import { useState } from 'react';
import {CardCreate} from '@app-types/types';
import Swal from 'sweetalert2';

export default function CardForm() {

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState <CardCreate> ({
    name:'',
    date_start: today,
    date_end: today,
    color: '#000000',
    genre: 'credit',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, 
      [e.target.name]: e.target.name === "name"? (e.target.value).toLowerCase() :  e.target.value});
  }; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date_start || !form.date_end || !form.color ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "No se ingreso todos los datos!"
      });
      return;
    } 
    try {
      const res = await fetch("/api/createCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
         Swal.fire({
        icon: "success",
        title:`Tarjeta ${form.name} agregada con exito!`,
        showConfirmButton: false,
        timer: 2000,
      });
        setForm({  name:'', date_start: today, date_end: today, color: '#000000', genre: 'credit' });
      } 
    } catch (error) {
      console.error("Error en fetch:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%] m-auto flex flex-col justify-between gap-4 text-primary z-10">
      <label className="input">
        <span className="label">Entidad financiera: </span>
        <input type="text" placeholder="Dejardins" name="name" value={form.name} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Fecha inicio del ciclo</span>
        <input type="date"  className="input input-md" name="date_start" value={form.date_start} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Fecha fin del ciclo</span>
        <input type="date"  className="input input-md" name="date_end" value={form.date_end} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Color tarjeta</span>
        <input type="color"  className="input input-md" name="color" value={form.color} onChange={handleChange}/>
      </label>
      <label className="flex flex-col gap-2 items-center">
        <span>Seleccione el tipo de tarjeta</span>
        <div className="join">
          <input className="join-item btn" type="radio" name="genre" value="credit" aria-label="Tarjeta Credito" onChange={handleChange} defaultChecked />
          <input className="join-item btn" type="radio" name="genre" value="debit"  aria-label="Tarjeta Debito" onChange={handleChange}/>
        </div>
      </label>
      <button className= "bg-primary p-3 rounded-md text-white" type="submit">Agregar tarjeta</button>
    </form>
  )
}