"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell} from "recharts";
import { getDataFilter} from "services/getData";
import { Data, PieData } from "@app-types/types";

const colors = ["#f7662d", "#ffbd33", "#dbff33", "#33ffbd"];

export function Graph() {
  const [data, setData] = useState<Data[]>([]);
  const [formattedData, setFormattedData] = useState<PieData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      getDataFilter("expenses").then(setData);
    };
    fetchData();
  }, []);
    
  useEffect(() => {
    // Create graph to Data
    const processedData: PieData[] = data.reduce<PieData[]>((acc, element) => {
      const index = acc.findIndex((item) => item.name === element.category);
      // add item value
      if (index !== -1) {
        acc[index].value += Number(element.amount);
      } else {
        acc.push({ name: element.category, value: Number(element.amount)});
      }
      return acc;
    }, []);
    setFormattedData(processedData);
    setLoading(false);
  }, [data]); 

  if (loading) {
    return <div className="text-2xl mb-10">Loading...</div>;
  }
  if (data.length === 0) {
    return <div className="text-2xl mb-10">No hay datos.</div>;
  }
  const renderLabel = (entry: PieData) => `${entry.name}`;
  return (
    <PieChart width={350} height={300}>
      <Pie
        data={formattedData}
        cx="50%"
        cy="50%"
        labelLine={false}
        innerRadius={60}
        outerRadius={80}
        label={renderLabel}
        dataKey="value" >
        {formattedData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]}  stroke={colors[index % colors.length]}/>
        ))}
      </Pie>
    </PieChart>
  );
}