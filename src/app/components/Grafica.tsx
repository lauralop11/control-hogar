"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell} from "recharts";
import { Data, PieData } from "@app-types/types";

type Props = {
  data: Data[] | null;
};

const COLORS = ["#54809c ", "#DAF7A6", "#2980b9"];

export default function Grafica({data}: Props) {
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
        acc.push({ name: element.categoria, value: Number(element.monto)});
      }
      return acc;
    }, []);
    // guardar los datos en el estado
    setFormattedData(processedData);
    setLoading(false);
  }, [data]); 

  if (loading) {
    return <div>Loading...</div>;
  }
  //mostrar componente si la pagina es de tipo gastos
    
  const renderLabel = (entry: PieData) => `${entry.name}`;
  return (
      <div>
        <PieChart width={300} height={200}>
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
      </PieChart>
    </div>

  );
}