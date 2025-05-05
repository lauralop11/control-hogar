"use client";
import {useState} from "react";
import BtnDelete from "@components/BtnDelete";
import {GastosCol, PropsCol} from "@app-types/types";


export default function Colombia ({data}:PropsCol) {
  const [form, setForm] = useState <GastosCol> ({
    descripcion: '',
    monto: 0,
    moneda:'CAD'
  });

  if(!data || data.length === 0){
    console.log("error", data)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm ({
      ...form,[e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!form.descripcion || !form.monto || !form.moneda){
      console.log("form incompleto", form)
    }
    try{
      const res = await fetch ('/api/colombia', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({descripcion:'', monto: 0, moneda:'CAD'});
        window.location.reload();
      }
    } catch (error){
      console.error("error", error)
    }
  }
  return (
    <section className="m-2 flex flex-col gap-2">
      <h1>Gastos colombia</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <label className=" w-full flex">
          <div className="join flex">
            <input className="flex-auto input join-item" type="text" placeholder="Descripcion" name="descripcion" value={form.descripcion} onChange={handleChange}/>
            <input className="w-25 input join-item" type="number" placeholder="$20.000" name="monto" value={form.monto} onChange={handleChange}/>
            <input className="join-item btn" type="radio" name="moneda" value="CAD" aria-label="CAD" onChange={handleChange} defaultChecked />
            <input className="join-item btn" type="radio" name="moneda" value="COP"  aria-label="COP" onChange={handleChange}/>
          </div>
        </label>          
        <button className="flex-none btn bg-primary text-white self-end mt-3" type="submit">Agregar</button>
      </form>
      <ul className="mt-4 text-primary list bg-base-100 rounded-box shadow-md">
     {
      data?.map((item)=>(
        <li key={item.id} className="p-5 grid grid-cols-3 justify-around">
          <span className="font-bold">{item.descripcion}</span>
          <div>
            <span>${item.monto}</span>
            <span className="font-bold ms-3">{item.moneda}</span>
          </div>
          <span className="text-right text-red-700">
            <BtnDelete  id={item.id ?? 0} tipo="colombia" />
          </span>
        </li>
      ))
     } 
      </ul>
    </section>
    
  )
}