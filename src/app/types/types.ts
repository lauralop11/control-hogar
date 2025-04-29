export type Data = {
  descripcion: string;
  monto: string | number;
  categoria: string;
  tarjeta: string;
  fecha: string | number;
  id: number;
};

export type AcordeonProps = {
  total?: number;
  tipo:string;
  data: Data[] | null;
};

export type TarjetaAgrupada= {
  tarjeta: string;
  total: number;
  categoria:{
    categoria: string;
    items: Data[];
    total: number;
  }[] ;
};

export type Tarjeta = {
  tarjeta:string;
  total:number;
  categoria: Record <string, Data[]>;
  };

 export type CardCreate = {
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  color: string;
  tipo: string;
  id?: string | number;
}; 

export type Formulario = {
  descripcion: string;
  monto: number;
  categoria: string;
  tarjeta: string;
};
export type PieData = { 
  name: string; 
  value: number; 
  porcentaje: number 
};