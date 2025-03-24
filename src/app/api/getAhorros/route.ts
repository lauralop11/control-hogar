
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const baseurl: string = process.env.DATABASE_URL || "";

export async function GET() {
  try {
    const sql = neon(baseurl);
    const ahorros = await sql`SELECT * FROM ahorros`;
    return NextResponse.json(ahorros);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}