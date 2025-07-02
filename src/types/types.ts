export type Data = {
  description: string;
  amount: string | number;
  category: string;
  card: string;
  date: string | number;
  id: number;
};

export type AcordeonProps = {
  type:string;
  data: Data[] | null;
};

export type GroupeCategory= {
  title: string;
  total: number;
  items:Data[];
};

export type Card= {
  card:string;
  total:number;
  category: Record <string, Data[]>;
  };

 export type CardCreate = {
  name: string;
  date_start: string;
  date_end: string;
  capacity: number | string;
  color: string;
  genre: string;
  id?: string | number;
}; 

export type Form = {
  description: string;
  amount: number;
  category: string;
  card: string;
};

export type PieData = { 
  name: string; 
  value: number; 
};
