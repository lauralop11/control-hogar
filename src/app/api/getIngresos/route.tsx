import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET() {
  const sql = neon(baseurl);

    try {
      const ingresos = await sql`SELECT * FROM ingresos`;
      return NextResponse.json(ingresos);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
export async function POST(req: Request) {
  const sql = neon(baseurl);
    try {
      const body = await req.json();
      const {descripcion, monto, tarjeta} = body;

      if (!descripcion || !monto || !tarjeta) {
        return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
      }

      const result = await sql`INSERT INTO ingresos (tarjeta, monto, descripcion) 
        VALUES (${tarjeta}, ${monto}, ${descripcion}) RETURNING *`;
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
      const { descripcion } = body;

      if (!descripcion) {
        return NextResponse.json({ error: "La descripcion es requerida" }, { status: 400 });
      }
      await sql`DELETE FROM ingresos WHERE descripcion = ${descripcion}`;
      return NextResponse.json({ message: "Ingreso eliminado con éxito" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
    }
}