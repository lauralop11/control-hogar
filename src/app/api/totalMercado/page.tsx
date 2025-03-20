import { neon } from '@neondatabase/serverless';

async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT SUM(monto) FROM mercado
      WHERE tc_costco_id = 1`;
      console.log(response);
    return response;
}
export default async function TotalMerado() {
  const data = await getData();
  return (
    <div>
      <h4 className="font-bold">Total Gasto Mercado: {data[0].sum}</h4>
    </div>
  )
    
}