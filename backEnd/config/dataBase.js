const mysql = require('mysql2/promise');
// ✅ Cargar el .env desde la carpeta backEnd
require('dotenv').config({ path: __dirname + '/../.env' });

// Verificación de variables cargadas
console.log('🔎 Variables de entorno cargadas:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME
});

// Pool de conexiones con soporte para Promesas
const conexion = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Validación inicial (opcional, solo para consola)
conexion.getConnection()
  .then(conn => {
    console.log('✅ Conectado a la base de datos 👌');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

module.exports = { conexion };