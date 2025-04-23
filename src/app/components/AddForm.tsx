'use client'
import { useState } from 'react';
import OptCardGasto from '@components/OptCardGasto';
import { Formulario } from '@app-types/types';

export default function AddForm({tabla}: {tabla: string}) {
  const [form, setForm] = useState<Formulario> ({
    descripcion: '',
    monto: 0,
    categoria: '',
    tarjeta: '',
  });

  const colores = {
    ahorros: "bg-savings",
    gastos: "bg-expenses",
    ingresos: "bg-income",
  }
  const color: string = colores[tabla] || "bg-white";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, 
      [e.target.name]: e.target.name === "monto"? parseFloat(e.target.value) :  e.target.value});
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.descripcion || !form.monto || !form.categoria || !form.tarjeta) {
      alert("Todos los campos son obligatorios");
      console.log("Formulario incompleto:", form);
      return;
    }
    try {
      const res = await fetch(`/api/${tabla}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert(`${tabla} agregado`);
        setForm({ descripcion: '', monto: 0, categoria: '', tarjeta: '' });
      } 
    } catch (error) {
      console.error("Error en fetch:", error);
    } 
  };

  const renderForm = () => {
    switch (tabla) {
      case "gastos":
        return (
          <>
            <label className="select">
              <span className="label">Categoría {tabla}</span>
              <select name="categoria" value={form.categoria} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="mercado">Mercado</option>
                <option value="carro">Carro</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            <label className="select">
              <span className="label">Tarjeta</span>
              <select className="select w-[50%]" name="tarjeta" value={form.tarjeta} onChange={handleChange}>
                <OptCardGasto/>
              </select>
            </label>
          </>
        );
        break;
      case "ahorros":
        return (
          <>
            <label className="select">
              <span className="label">Categoría {tabla}</span>
              <select name="categoria" value={form.categoria} onChange={handleChange}>
                <option value=""  disabled>Seleccione</option>
                <option value="ahorro">Ahorro</option>
                <option value="inversion">Inversión</option>
              </select>
            </label>
            <label className="select">
              <span className="label">Cuenta</span>
              <select className="select w-[50%]" name="tarjeta" value={form.tarjeta} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="dejardins">Dejardins</option>
                <option value="cibc">Cibc</option>
              </select>
            </label>
          </>
        );
        break;
      case "ingresos":
        return (
          <>
            <label className="select">
              <span className="label">Categoría {tabla}</span>
              <select name="categoria" value={form.categoria} onChange={handleChange}>
                <option value=""  disabled>Seleccione</option>
                <option value="salario">Salario</option>
                <option value="bonos">Bonos</option>
                <option value="impuestos">Impuestos</option>
              </select>
            </label>
            <label className="select">
              <span className="label">Cuenta</span>
              <select className="select w-[50%]" name="tarjeta" value={form.tarjeta} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="dejardins">Dejardins</option>
                <option value="cibc">Cibc</option>
              </select>
            </label>
          </>
        );
        break;
      default:
        break;
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%] m-auto flex flex-col justify-between gap-4 text-primary z-10">
      <label className="input">
        <span className="label">Descripción: </span>
        <input type="text" placeholder="Cafecito" name="descripcion" value={form.descripcion} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Monto: $</span>
        <input type="number" placeholder="20.00" className="input input-md" name="monto" value={form.monto} onChange={handleChange}/>
      </label>
      {renderForm()}
      <button className={`${color} p-3 rounded-md text-white`} type="submit">Agregar {tabla}</button>
    </form>
  );

}

