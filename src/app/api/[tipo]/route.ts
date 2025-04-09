import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ tipo: string }> }
) {
   // Lógica para TRAER los datos de ahorro
  const sql = neon(baseurl);
  const {tipo}= await params;

  if (!tipo || !['ahorros', 'ingresos', 'gastos'].includes(tipo)) {
    return NextResponse.json({ error: "Ingresar el tipo de tabla" }, { status: 400 });
  }
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
  { params }: { params: Promise<{ tipo: string }> }) {
  // Lógica para AGREGAR: Agregar un ahorro
  const sql = neon(baseurl);
  const {tipo}= await params;
    try {
      const body = await req.json();
      const {monto, categoria, cuenta} = body;
      if (!monto || !categoria || !cuenta) {
        return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
      }
      const result = await sql`INSERT INTO ${tipo} VALUES (${monto}, ${categoria},${cuenta}) RETURNING *`;
      return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error inserting data" }, { status: 500 });
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
      await sql`DELETE FROM ${tipo} WHERE id = ${id}`;
      return NextResponse.json({ message: `${tipo} eliminado con éxito` }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
    }
}