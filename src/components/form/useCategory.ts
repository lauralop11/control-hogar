'use client'
import { useParams } from 'next/navigation' 
 
type Params = {
  category?: string
};

export function useCategory () {
  const params = useParams() as Params;
  let {category} = params;

  if( !category){
    category = 'card';
  }

  const names = {
    expenses: 'Gastos',
    income: 'Ingresos',
    savings: 'Ahorros',
    card: 'Tarjeta',
  }
  const name = names[category]

  return {category, name} 
 }
 