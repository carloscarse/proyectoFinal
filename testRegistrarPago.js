// proyecto/testRegistrarPago.js
const axios = require('axios');

async function testRegistrarPago() {
  console.log('🟡 Iniciando test de registro de pago...');

  try {
    // Datos de prueba: ajusta según lo que quieras registrar
    const nuevoPago = {
      registro: new Date().toISOString().slice(0, 19).replace('T', ' '), // fecha/hora actual
      fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),    // misma fecha
      usuario: 1,        // ID de usuario existente
      factura: 3,        // ID de factura existente
      inquilino: 15,      // ID de inquilino existente
      nota: 'Pago de prueba desde testRegistrarPago.js'
    };

    // POST al backend
    const res = await axios.post('http://localhost:8000/pago/pago', nuevoPago);

    console.log('🟢 Respuesta del backend:', res.data);

    // Verificar que se insertó
    const consulta = await axios.get('http://localhost:8000/pago/pagos');
    console.log('📋 Lista de pagos después de insertar:');
    console.log(consulta.data);
  } catch (error) {
    console.error('❌ Error al registrar pago:', error.message);
    if (error.response) {
      console.error('Detalles:', error.response.data);
    }
  }
}

testRegistrarPago();