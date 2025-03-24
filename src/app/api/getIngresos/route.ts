import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET() {
  try {
    const sql = neon(baseurl);
    const ingresos = await sql`SELECT * FROM ingresos`;
    return NextResponse.json(ingresos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}