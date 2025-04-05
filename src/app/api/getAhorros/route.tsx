import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET() {
   // Lógica para TRAER los datos de ahorro
  const sql = neon(baseurl);

    try {
      const ingresos = await sql`SELECT * FROM ahorros`;
      return NextResponse.json(ingresos);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
export async function POST(req: Request) {
  // Lógica para AGREGAR: Agregar un ahorro
  const sql = neon(baseurl);
    try {
      const body = await req.json();
      const {monto, cuenta} = body;

      if (!monto || !cuenta) {
        return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
      }

      const result = await sql`INSERT INTO ahorros VALUES (${monto}, ${cuenta}) RETURNING *`;
      return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error inserting data" }, { status: 500 });
    }
  } 
  export async function DELETE(req: Request) {
    // Lógica para DELETE: Eliminar un ahorro por descripcion
  const sql = neon(baseurl);
    try {
      const body = await req.json();
      const { descripcion } = body;

      if (!descripcion) {
        return NextResponse.json({ error: "La descripcion es requerida" }, { status: 400 });
      }
      await sql`DELETE FROM ahorro WHERE descripcion = ${descripcion}`;
      return NextResponse.json({ message: "Ahorro eliminado con éxito" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
    }
}