export type Data = {
  descripcion: string;
  monto: string | number;
  categoria: string;
  tarjeta: string;
  fecha: string | number;
  id: number;
};

export type AcordeonProps = {
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