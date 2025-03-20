import { neon } from '@neondatabase/serverless';

async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM ingresos`;
    return response;
}
export default async function GetIngresos() {
  const data = await getData();
  return (
    <span >Total de ingresos: {data[0]?.total_gastos}</span>
  )
    
}
