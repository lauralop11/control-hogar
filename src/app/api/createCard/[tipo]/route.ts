import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ tipo: string }>}) {
  // Lógica para AGREGAR: Agregar un ahorro
  console.log("Solicitud POST recibida");
  const sql = neon(baseurl);
  const {tipo}= await params;

  try {
    const body = await req.json();
    const {nombre, fecha_inicio, fecha_fin, color} = body;
    
    const query = `
      INSERT INTO tarjeta_${tipo} (nombre, fecha_inicio, fecha_fin, color)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await sql(query, [nombre, fecha_inicio, fecha_fin, color]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error parseando",error);
    return NextResponse.json({ error: "Error inserting data"}, { status: 500 });
  }
} 