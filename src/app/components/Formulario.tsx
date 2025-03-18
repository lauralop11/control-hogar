'use client'
import { useState } from 'react';

const Formulario = () => {;
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tc_costco_id, setTcCostcoId] = useState(1); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { monto, descripcion, tc_costco_id };

    try {
      const response = await fetch('/api/addGasto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Gasto agregado:', result);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error desconocido");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[50%] flex flex-col justify-center items-center gap-4">
      <div className="">
        <label htmlFor="monto">Monto:</label>
        <input className="border-zinc-100 border-1" type="number" id="monto" value={monto} onChange={(e) => setMonto(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input className="border-zinc-100 border-1" type="text" id="descripcion" value={descripcion} 
          onChange={
            (e) => setDescripcion(e.target.value)}
        />
      </div>
      <button className="bg-expenses p-3 rounded-md text-white" type="submit">Agregar Gasto</button>
    </form>
  );
};

export default Formulario;