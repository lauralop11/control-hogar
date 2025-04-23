import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";


export async function GET() {
   // Lógica para TRAER los datos 
   console.log("Solicitud GET recibida");
  const sql = neon(baseurl);
  try {
    const data = await sql(`SELECT * FROM tarjetas`);
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
    const {nombre, fecha_inicio, fecha_fin, color, tipo} = body;
    
    const query = `
      INSERT INTO tarjetas (nombre, fecha_inicio, fecha_fin, color, tipo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await sql(query, [nombre, fecha_inicio, fecha_fin, color, tipo]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error parseando",error);
    return NextResponse.json({ error: "Error inserting data"}, { status: 500 });
  }
} 