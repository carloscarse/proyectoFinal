// proyecto/testRegistrarItemPago.js
const axios = require('axios');

async function testRegistrarItemPago() {
  console.log('🟡 Iniciando test de registro de item de pago...');

  try {
    // Datos de prueba: ajusta según tu esquema
    const nuevoItem = {
      item: 'Servicio',
      descripcion: 'Pago de servicio adicional',
      cantidad: 2,
      precio: 2500.00,
      monto: 5000.00,
      nota: 'Item de prueba desde testRegistrarItemPago.js',
      pago: 2 // 👈 ID de pago existente (ejemplo: el que creaste antes)
    };

    // POST al backend
    const res = await axios.post('http://localhost:8000/itempago/itempago', nuevoItem);

    console.log('🟢 Respuesta del backend:', res.data);

    // Verificar que se insertó
    const consulta = await axios.get('http://localhost:8000/itempago/itempagos');
    console.log('📋 Lista de items de pago después de insertar:');
    console.log(consulta.data);
  } catch (error) {
    console.error('❌ Error al registrar item de pago:', error.message);
    if (error.response) {
      console.error('Detalles:', error.response.data);
    }
  }
}

testRegistrarItemPago();