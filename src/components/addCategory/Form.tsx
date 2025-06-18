'use client'
import { useState } from 'react';
import SelectCard from '@components/addCategory/SelectCard';
import { Form} from '@app-types/types';

export default function FormAdd({category}: {category: string}) {

  const [form, setForm] = useState<Form> ({
    description: '',
    amount: 0,
    category: '',
    card: '',
  });

  const colores = {
    savings: "bg-savings",
    expenses: "bg-expenses",
    income: "bg-income",
  }
  const color: string = colores[category] || "bg-white";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, 
      [e.target.name]: e.target.name === "amount"? parseFloat(e.target.value) :  e.target.value});
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category || !form.card) {
      alert("Todos los campos son obligatorios");
      console.log("Formulario incompleto:", form);
      return;
    }
    try {
      const res = await fetch(`/api/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert(`${category} agregado`);
        setForm({ description: '', amount: 0, category: '', card: '' });
      } 
    } catch (error) {
      console.error("Error en fetch:", error);
    } 
  };

  const renderForm = () => {
    switch (category) {
      case "expenses":
        return (
          <>
            <label className="select">
              <span className="label">Categoría {category}</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="mercado">Mercado</option>
                <option value="carro">Carro</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            <label className="select">
              <span className="label">Tarjeta</span>
              <select className="select w-[50%]" name="card" value={form.card} onChange={handleChange}>
                <SelectCard/>
              </select>
            </label>
          </>
        );
        break;
      case "savings":
        return (
          <>
            <label className="select">
              <span className="label">Categoría {category}</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value=""  disabled>Seleccione</option>
                <option value="ahorro">Ahorro</option>
                <option value="inversion">Inversión</option>
              </select>
            </label>
            <label className="select">
              <span className="label">account</span>
              <select className="select w-[50%]" name="card" value={form.card} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="dejardins">Dejardins</option>
                <option value="cibc">Cibc</option>
              </select>
            </label>
          </>
        );
        break;
      case "income":
        return (
          <>
            <label className="select">
              <span className="label">Categoría {category}</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value=""  disabled>Seleccione</option>
                <option value="salario">Salario</option>
                <option value="bonos">Bonos</option>
                <option value="impuestos">Impuestos</option>
              </select>
            </label>
            <label className="select">
              <span className="label">account</span>
              <select className="select w-[50%]" name="card" value={form.card} onChange={handleChange}>
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
        <input type="text" placeholder="Cafecito" name="description" value={form.description} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Monto: $</span>
        <input type="number" placeholder="20.00" className="input input-md" name="amount" value={form.amount} onChange={handleChange}/>
      </label>
      {renderForm()}
      <button className={`${color} p-3 rounded-md text-white`} type="submit">Agregar {category}</button>
    </form>
  );

}

