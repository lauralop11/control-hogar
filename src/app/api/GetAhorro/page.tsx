import { neon } from '@neondatabase/serverless';

async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM ahorros`;
    return response;
}
export default async function GetAhorro() {
  const data = await getData();
  return (
      <span className="font-bold text-savings">Total ahorro: {data[0].sum}</span>
  )
    
}