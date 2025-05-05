import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET() {
   // Lógica para TRAER los datos 
  const sql = neon(baseurl);
  try {
    const data = await sql(`SELECT * FROM colombia`);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export async function POST( req: Request) {
  // Lógica para AGREGAR: Agregar un ahorro
  const sql = neon(baseurl);
  try {
    const body = await req.json();
    const {descripcion, monto, moneda} = body;
    const query = `
      INSERT INTO colombia (descripcion, monto, moneda)
      VALUES ($1, $2, $3)
      RETURNING *; `;
    const result = await sql(query, [descripcion, monto, moneda]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error parseando",error);
    return NextResponse.json({ error: "Error inserting data"}, { status: 500 });
  }
} 

export async function DELETE(
  req: Request) {
  // Lógica para DELETE: Eliminar un gasto por descripcion
  const sql = neon(baseurl);
    try {
      const body = await req.json();
      const {id} = body;
      if (!id) {
        return NextResponse.json({ error: "El ID es necesario" }, { status: 400 });
      }
      const query = `DELETE FROM colombia WHERE id = $1`;
      await sql(query, [id]);
      return NextResponse.json({ message: `Gasto colombia eliminado con éxito` }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
    }
}