// proyecto/backEnd/config/dataBase.js
const mysql = require('mysql2/promise');
// ✅ Cargar el .env desde la carpeta backEnd
require('dotenv').config({ path: __dirname + '/../.env' });

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

// Validación inicial (opcional, solo para errores)
conexion.getConnection()
  .then(conn => {
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  });

module.exports = { conexion };