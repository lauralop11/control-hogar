import { neon } from '@neondatabase/serverless';

async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM gastos`;
    return response;
}
export default async function GetGastos() {
  const data = await getData();
  const total = data.reduce((suma, item) =>  {
    return suma + Number(item.monto);
  }, 0);
  
  return (
      <span > Total de gastos: ${total}</span>
  )
    
}
