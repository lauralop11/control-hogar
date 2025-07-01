"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell} from "recharts";
import { getDataFilter} from "@lib/getData";
import { Data, PieData } from "@app-types/types";

const colors = ["#54809c", "#DAF7A6", "#2980b9"];

export default function Graph() {
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
    if (data.length === 0) {
      setLoading(false);
      return;
    }
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
    return <div>Loading...</div>;
  }
    
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
          dataKey="value" >
          {formattedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}