import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";


export async function GET() {
   // Lógica para TRAER los datos 
   console.log("Solicitud GET recibida");
  const sql = neon(baseurl);
  try {
    const data = await sql(`SELECT * FROM cards`);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Lógica para AGREGAR: Agregar un ahorro
  console.log("Solicitud POST recibida");
  const sql = neon(baseurl);

  try {
    const body = await req.json();
    const {name, cutoff_date, date_end, color, type} = body;
    
    const query = `
      INSERT INTO tarjetas (name, cutoff_date, date_end, color, typeo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await sql(query, [name, cutoff_date, date_end, color, type]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error parseando",error);
    return NextResponse.json({ error: "Error inserting data"}, { status: 500 });
  }
} 