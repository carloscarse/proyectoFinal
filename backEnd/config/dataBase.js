const mysql = require('mysql2/promise');
require('dotenv').config();

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