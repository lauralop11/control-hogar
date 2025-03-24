/* import { neon } from '@neondatabase/serverless';

async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM ahorros`;
    return response;
}
export async function GetAhorros() {
  const data = await getData();
  const total = data.reduce((suma, item) =>  {
    return suma + Number(item.monto);
  }, 0);
  return (
      <span>Total ahorro: {total}</span>
  )
    
} */
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM ahorros`;

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}