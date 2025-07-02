import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET() {
   // Logic for get card information
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
  // Logic for create new card
  console.log("Solicitud POST recibida");
  const sql = neon(baseurl);
  try {
    const body = await req.json();
    const {name, date_start, date_end, capacity, color, genre} = body;    
    const query = `
      INSERT INTO cards (name, date_start, date_end, capacity, color, genre)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await sql(query, [name, date_start, date_end, capacity, color, genre]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error parseando",error);
    return NextResponse.json({ error: "Error inserting data"}, { status: 500 });
  }
} 