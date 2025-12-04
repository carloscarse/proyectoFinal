// testRegistrarFacturas.js
const axios = require('axios');

axios.post('http://localhost:8000/factura', {
  fecha: '2025-12-03 00:00:00',   // DATETIME válido
  numero: 1001,                   // número de factura
  estado: 'emitida',              // debe ser 'emitida' o 'pagada'
  inquilino: 15,                   // ID de inquilino existente
  nota: 'Factura de prueba con DATETIME'
})
  .then(res => {
    console.log('✅ Factura registrada correctamente:', res.data);
  })
  .catch(err => {
    console.error('❌ Error al registrar factura:', err.message);
  });