'use client'
import { useState } from 'react';
import SelectCard from '@components/addCategory/SelectCard';
import { Form} from '@app-types/types';
import Swal from 'sweetalert2';

export default function FormAdd({category, name}: {category: string; name: string}) {

  const [form, setForm] = useState<Form> ({
    description: '',
    amount: 0,
    category: '',
    card: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, 
      [e.target.name]: e.target.name === "amount"? parseFloat(e.target.value) :  e.target.value});
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category || !form.card) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "No se ingreso todos los datos!"
      });
      return;
    }
    try {
      const res = await fetch(`/api/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
         Swal.fire({
        icon: "success",
        title:`Se ha guardado con exito el ${name}`,
        showConfirmButton: false,
        timer: 2000,
      });
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
              <span className="label">Categoría</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="mercado">Mercado</option>
                <option value="carro">Carro</option>
                <option value="restaurante">Restaurante</option>
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
              <span className="label">Categoría</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value=""  disabled>Seleccione</option>
                <option value="ahorro">Ahorro</option>
                <option value="inversion">Inversión</option>
              </select>
            </label>
            <label className="select">
              <span className="label">Cuenta</span>
              <select className="select w-[50%]" name="card" value={form.card} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="dejardins">Fondos Mutuos RBC</option>
                <option value="cibc">Fondos Mutuos CIBC</option>
              </select>
            </label>
          </>
        );
        break;
      case "income":
        return (
          <>
            <label className="select">
              <span className="label">Categoría</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value=""  disabled>Seleccione</option>
                <option value="salario">Salario</option>
                <option value="bonos">Bonos</option>
                <option value="impuestos">Impuestos</option>
              </select>
            </label>
            <label className="select">
              <span className="label">Cuenta</span>
              <select className="select w-[50%]" name="card" value={form.card} onChange={handleChange}>
                <option value="" disabled>Seleccione</option>
                <option value="dejardins">RBC</option>
                <option value="cibc">CIBC</option>
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
    <form onSubmit={handleSubmit} className="w-full md:w-[50%] md:m-auto flex flex-col justify-between items-center gap-4 z-10 text-black">
      <label className="input">
        <span className="label">Descripción: </span>
        <input type="text" placeholder="Cafecito" name="description" value={form.description} onChange={handleChange}/>
      </label>
      <label className="input">
        <span className="label">Monto: $</span>
        <input type="number" placeholder="20.00"  name="amount" value={form.amount} onChange={handleChange}/>
      </label>
      {renderForm()}
      <button className="button btn-primary text-white w-[30%] self-center" type="submit">Agregar {name}</button>
    </form>
  );

}

