"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#03658C", "#F29F05", "#023059"];

type Data = {
  tarjeta: string;
  monto: string | number;
  descripcion: string;
  categoria: string;
};

type PieData = { name: string; value: number; porcentaje: number };

interface Props {
  data: Data[] | null;
}
export default function Grafica({ data }: Props) {
  const [formattedData, setFormattedData] = useState<PieData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!data || data.length === 0) {
      setLoading(false);
      return;
    } 
    const total: number = Array.isArray(data)
    ? parseFloat(data.reduce((acumulado, item) => acumulado + Number(item.monto || 0), 0).toFixed(2))
    : 0;

    const processedData: PieData[] = data.reduce<PieData[]>((acc, gasto) => {
      const index = acc.findIndex((item) => item.name === gasto.categoria);
      if (index !== -1) {
        acc[index].value += Number(gasto.monto);

      } else {
        acc.push({ name: gasto.categoria, value: Number(gasto.monto), porcentaje: parseFloat(((Number(gasto.monto) / (total)) * 100).toFixed(2))});
      }
      return acc;
    }, []);

    setFormattedData(processedData);
    setLoading(false);
  }, [data]); 

  if (loading) {
    return <div>Loading...</div>;
  }
  const renderLabel = (entry: PieData) => `%${entry.porcentaje}`;
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={formattedData}
        cx="50%"
        cy="50%"
        outerRadius={70}
        label={renderLabel}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {formattedData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}