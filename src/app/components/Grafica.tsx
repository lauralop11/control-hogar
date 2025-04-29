"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import BudgetLimite from "@components/BudgetLimit";
import { Data, PieData } from "@app-types/types";

type Props = {
  data: Data[] | null;
  total: number;
  tipo: string;
};

const COLORS = ["#03658C", "#F29F05", "#023059"];

export default function Grafica({ data,total,tipo }: Props) {
  const [formattedData, setFormattedData] = useState<PieData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!data || data.length === 0) {
      setLoading(false);
      return;
    } 
    // procesamiento data para crear grafica
    const processedData: PieData[] = data.reduce<PieData[]>((acc, element) => {
      const index = acc.findIndex((item) => item.name === element.categoria);
      // si existe la categoria en el acumulador agrgar item value = monto
      if (index !== -1) {
        acc[index].value += Number(element.monto);
      } else {
        acc.push({ name: element.categoria, value: Number(element.monto), porcentaje: parseFloat(((Number(element.monto) / (total)) * 100).toFixed(2))});
      }
      return acc;
    }, []);
    // guardar los datos en el estado
    setFormattedData(processedData);
    setLoading(false);
  }, [data, total]); 

  if (loading) {
    return <div>Loading...</div>;
  }
  //mostrar componente si la pagina es de tipo gasto
  const budget = () => {
    if (tipo === "gastos") {
      return <BudgetLimite data={formattedData} />;
    }
    return null;
  };
  const renderLabel = (entry: PieData) => `%${entry.porcentaje}`;
  return (
    <div className="grid md:grid-cols-2 justify-items-center items-center gap-5 w-full m-5">
      <div>
        <PieChart width={300} height={300}>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={70}
          label={renderLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {formattedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
      {budget()}
    </div>

  );
}