const mysql = require('mysql2');
require('dotenv').config(); // Esto Carga las variables desde .env, se usa para no dejar a mano los datos de la base de datos.

// Cambiamos de createConnection, como lo enseñó el profesor a createPool, ésto sirve para que, en caso de caerse la conexión, puede recuperarse sin reiniciar el servidor.
const conexion = mysql.createPool({
  host: process.env.DB_HOST,         // Dirección del servidor
  user: process.env.DB_USER,         // Usuario de la base de datos
  password: process.env.DB_PASS,     // Contraseña del usuario
  database: process.env.DB_NAME,     // Nombre de la base de datos
  waitForConnections: true,          // Espera si todas las conexiones están ocupadas
  connectionLimit: 10,               // Máximo de conexiones simultáneas
  queueLimit: 0                      // Sin límite de peticiones en cola
});

// Validación de conexión inicial de prueba
conexion.getConnection((error, connection) => {
  if (error) {
    console.error('❌ Error al conectar al pool de la base de datos:', error);
    return;
  }
  console.log('✅ Conectado a la base de datos 👌');
  connection.release(); // Liberamos la conexión de prueba
});

module.exports = { conexion };