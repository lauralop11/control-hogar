import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#03658C", "#F29F05", "#023059"];

type Data = {
  tarjeta: string;
  monto: string | number;
  descripcion: string;
  categoria: string;
};

type PieData = { name: string; value: number };

export default function Grafica({ data }: Data) {
  const [formattedData, setFormattedData] = useState<PieData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) {
      setLoading(false);
      return;
    }

    const processedData: PieData[] = data.reduce<PieData[]>((acc, gasto) => {
      const index = acc.findIndex((item) => item.name === gasto.categoria);
      if (index !== -1) {
        acc[index].value += Number(gasto.monto);
      } else {
        acc.push({ name: gasto.categoria, value: Number(gasto.monto) });
      }
      return acc;
    }, []);

    setFormattedData(processedData);
    setLoading(false);
  }, [data]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderLabel = (entry: PieData) => entry.name;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={formattedData}
        cx="50%"
        cy="50%"
        outerRadius={90}
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