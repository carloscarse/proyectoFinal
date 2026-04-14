// ✅ Script de prueba para registrar una nueva reserva
const { conexion } = require('./backEnd/config/dataBase');

async function testRegistrarReserva() {
  try {
    console.log('🔎 Insertando una nueva reserva de prueba...');

    const sql = `
      INSERT INTO reserva 
      (fecha, espacio, inquilino, tipo, diaInicio, diaFin, actividad, adelanto, estado, nota)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // ⚠️ Ajustá estos valores según tus datos reales
    const valores = [
      new Date().toISOString().slice(0, 10), // fecha actual YYYY-MM-DD
      5,                                     // espacio (id válido en tabla espacio)
      15,                                     // inquilino (id válido en tabla inquilino)
      'evento',                              // tipo
      '2025-12-05 10:00:00',                 // diaInicio (DATETIME)
      '2025-12-05 12:00:00',                 // diaFin (DATETIME)
      'Conferencia',                         // actividad
      500.00,                                // adelanto
      'pagado',                              // estado ('pagado' o 'adeudado')
      'Reserva de prueba con DATETIME'       // nota
    ];

    const [result] = await conexion.query(sql, valores);

    console.log(`✅ Reserva registrada correctamente con ID: ${result.insertId}`);
  } catch (err) {
    console.error('❌ Error al registrar reserva:', err.message);
  } finally {
    await conexion.end();
  }
}

// Ejecutar
testRegistrarReserva();