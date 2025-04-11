import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ tipo: string }> }
) {
   // Lógica para TRAER los datos 
   console.log("Solicitud GET recibida");
  const sql = neon(baseurl);
  const {tipo}= await params;
  try {
    const data = await sql(`SELECT * FROM ${tipo}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
export async function POST(
  req: Request,
  { params }: { params: Promise<{ tipo: string }>}) {
  // Lógica para AGREGAR: Agregar un ahorro
  console.log("Solicitud POST recibida");
  const sql = neon(baseurl);
  const {tipo}= await params;

  try {
    const body = await req.json();
    const {descripcion, monto, categoria, tarjeta} = body;
    
    const query = `
      INSERT INTO ${tipo} (descripcion, monto, categoria, tarjeta)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await sql(query, [descripcion, monto, categoria, tarjeta]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error parseando",error);
    return NextResponse.json({ error: "Error inserting data"}, { status: 500 });
  }
} 

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ tipo: string }> }) {
  // Lógica para DELETE: Eliminar un gasto por descripcion
  const sql = neon(baseurl);
  const {tipo}= await params;
    try {
      const body = await req.json();
      const {id} = body;
      if (!id) {
        return NextResponse.json({ error: "El ID es necesario" }, { status: 400 });
      }
      const query = `DELETE FROM ${tipo} WHERE id = $1`;
      await sql(query, [id]);
      return NextResponse.json({ message: `${tipo} eliminado con éxito` }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
    }
}