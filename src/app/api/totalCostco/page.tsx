import { neon } from '@neondatabase/serverless';

async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM tc_costco`;
    return response;
}
export default async function TotalCostco() {
  const data = await getData();
  return (
    <div>
      <h4 className="font-bold">Total Gasto Costco: {data[0]?.total_gastos}</h4>
    </div>
  )
    
}
