'use client';
import { useParams } from "next/navigation";
import PageOptions from "@components/PageOptions";

type Params = {
  tipo: string;
}

export default function Page() {
const params = useParams() as Params;
const {tipo} = params;

return (
  <PageOptions tipo={tipo}/>
);
}