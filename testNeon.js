// testNeon.js
const { neon } = require('@neondatabase/serverless');

// Cargar la URL de la base de datos desde el archivo .env
const client = neon(process.env.DATABASE_URL);

async function testQuery() {
  try {
    // Verificar si DATABASE_URL está configurada correctamente
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    // Ejecutar una consulta simple a la base de datos
    const result = await client.query(
      `SELECT NOW();`
    );

    console.log('Conexión exitosa:', result.rows);
  } catch (error) {
    console.error('Error al conectar o consultar la base de datos:', error);
  }
}

// Ejecutar la función de prueba
testQuery();