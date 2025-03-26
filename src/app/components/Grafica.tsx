'use client';
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DonutChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchGastos() {
      const res = await fetch("/api/getGastos");
      const gastos = await res.json();

      // Convertir los datos a un formato adecuado para la gráfica
      const formattedData = gastos.reduce((acc, gasto) => {
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
    console.log(data)
  const renderLabel = data.map((item)=> item.value);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold self-start">Distribución de Gastos</h2>
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
    </div>
  );
}