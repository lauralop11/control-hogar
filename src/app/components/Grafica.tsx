'use client';
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Gasto = {
  categoria: string;
  monto: string | number;
}
type PieData = { name: string; value: number };

export default function DonutChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchGastos() {
      const res = await fetch("/api/getGastos");
      const gastos: Gasto[] = await res.json();

      // Convertir los datos a un formato adecuado para la gráfica
      const formattedData:PieData[]   = gastos.reduce<PieData[]>((acc, gasto) => {
        const index = acc.findIndex((item) => item.name === gasto.categoria);
        if (index !== -1) {
          acc[index].value += Number(gasto.monto);
        } else {
          acc.push({ name: gasto.categoria, value: Number(gasto.monto) });
        }
        return acc;
      }, []);

      setData(formattedData);
      setLoading(false); 
    }
    fetchGastos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const renderLabel = data.map<{value:string}>((item)=> item.value);

  return (
   
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={100}
          label={renderLabel}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
  
  );
}