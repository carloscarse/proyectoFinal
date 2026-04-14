// ✅ Script de prueba para listar reservas desde la base de datos
const { conexion } = require('./backEnd/config/dataBase');

async function testReservas() {
  try {
    console.log('🔎 Consultando reservas en la base de datos...');
    const [rows] = await conexion.query('SELECT * FROM reserva');

    if (rows.length === 0) {
      console.log('⚠️ No hay reservas registradas en la tabla.');
    } else {
      console.log('✅ Reservas encontradas:');
      rows.forEach((reserva) => {
        console.log(
          `ID: ${reserva.id} | Fecha: ${reserva.fecha} | Espacio: ${reserva.espacio} | Inquilino: ${reserva.inquilino} | Tipo: ${reserva.tipo} | Inicio: ${reserva.diaInicio} | Fin: ${reserva.diaFin} | Actividad: ${reserva.actividad} | Adelanto: ${reserva.adelanto} | Estado: ${reserva.estado} | Nota: ${reserva.nota}`
        );
      });
    }
  } catch (err) {
    console.error('❌ Error al consultar reservas:', err.message);
  } finally {
    await conexion.end();
  }
}

// Ejecutar
testReservas();