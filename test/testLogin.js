// proyecto/test/testLogin.js
console.log("🚀 Iniciando prueba SELECT * de usuarios...");

function checkModule(name) {
  try {
    require.resolve(name);
    console.log(`✅ Módulo ${name} encontrado`);
    return true;
  } catch (err) {
    console.error(`❌ Falta instalar ${name}:`, err.message);
    return false;
  }
}

const deps = ["dotenv", "mysql2/promise"];
const allDepsOk = deps.every(checkModule);

if (!allDepsOk) {
  console.error("❌ No todas las dependencias están instaladas. Corre:");
  console.error("   npm install dotenv mysql2");
  process.exit(1);
}

require('dotenv').config({ path: '../backEnd/.env' });
const mysql = require('mysql2/promise');

(async () => {
  try {
    console.log("🔎 Variables de entorno:");
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_NAME:", process.env.DB_NAME);

    // Conexión directa
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    // SELECT * sin filtro
    const [rows] = await conn.query("SELECT * FROM usuario");
    console.log("✅ Usuarios en la tabla:");
    console.table(rows);

    await conn.end();
    console.log("🔒 Conexión cerrada");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al consultar usuarios:", err.message);
    console.error(err);
    process.exit(1);
  }
})();