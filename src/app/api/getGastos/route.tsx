import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET() {
  const sql = neon(baseurl);
    try {
      const ingresos = await sql`SELECT * FROM gastos`;
      return NextResponse.json(ingresos);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
  }
export async function POST(req: Request) {
  // Lógica para POST: Crear un nuevo ingreso
  const sql = neon(baseurl);
    try {
      const body = await req.json();
      const { tarjeta, monto, descripcion, categoria } = body;

      if (!tarjeta || !monto || !descripcion || !categoria) {
        return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
      }
      const result = await sql` INSERT INTO gastos 
        VALUES (${descripcion}, ${monto},${categoria}, ${tarjeta}) RETURNING * `;
      return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error inserting data" }, { status: 500 });
    }
  }
export async function DELETE(req: Request) {
  // Lógica para DELETE: Eliminar un ingreso por ID
  const sql = neon(baseurl);
    try {
      const body = await req.json();
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: "La descripcion es necesaria" }, { status: 400 });
      }
      await sql`DELETE FROM gastos WHERE descripcion = ${id}`;
      return NextResponse.json({ message: "Ingreso eliminado con éxito" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
    }
}