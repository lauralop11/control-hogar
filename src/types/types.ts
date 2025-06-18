export type Data = {
  description: string;
  amount: string | number;
  category: string;
  card: string;
  date: string | number;
  id: number;
};

export type AcordeonProps = {
  total?: number;
  type:string;
  data: Data[] | null;
};

export type GroupedCard= {
  card: string;
  total: number;
  category:{
    category: string;
    items: Data[];
    total: number;
  }[] ;
};

export type Card= {
  card:string;
  total:number;
  category: Record <string, Data[]>;
  };

 export type CardCreate = {
  name: string;
  cutoff_date: string;
  date_end: string;
  color: string;
  type: string;
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