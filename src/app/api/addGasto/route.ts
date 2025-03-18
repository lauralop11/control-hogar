import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const client = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    console.log("📢 DATABASE_URL:", process.env.DATABASE_URL ? "Cargada" : "No definida");

    const { monto, tc_costco_id, descripcion } = await req.json();
    
    const result = await client.query(
      `INSERT INTO mercado (monto, tc_costco_id, descripcion) VALUES ($1, $2, $3) RETURNING *`,
      [monto, tc_costco_id, descripcion]
    );
    console.log("✅ Gasto insertado:", result.rows[0]);
    
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    console.error("❌ Error al insertar el gasto:", error.message);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}