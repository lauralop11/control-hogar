import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET(
  req: Request,
  {params}: {params: Promise<{type: string}>}) {
   // Logic for GET data 
  const sql = neon(baseurl);
  const {type}= await params;
  try {
    const data = await sql(`SELECT * FROM ${type}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
export async function POST(
  req: Request,
  { params }: { params: Promise<{ type: string }>}) {
  // Logic for POST: insert items
  const sql = neon(baseurl);
  const {type}= await params;

  try {
    const body = await req.json();
    const {description, amount, category, card} = body;
    
    const query = `
      INSERT INTO ${type} (description, amount, category, card)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await sql(query, [description, amount, category, card]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error parseando",error);
    return NextResponse.json({ error: "Error inserting data"}, { status: 500 });
  }
} 

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ type: string }> }) {
  // Logic for DELETE: delete item
  const sql = neon(baseurl);
  const {type}= await params;
    try {
      const body = await req.json();
      const {id} = body;
      if (!id) {
        return NextResponse.json({ error: "El ID es necesario" }, { status: 400 });
      }
      const query = `DELETE FROM ${type} WHERE id = $1`;
      await sql(query, [id]);
      return NextResponse.json({ message: `${type} eliminado con éxito` }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting data" }, { status: 500 });
    }
}