// testFactura.js
const axios = require('axios');

axios.get('http://localhost:8000/factura')
  .then(res => {
    console.log('✅ Facturas en la base de datos:');
    console.table(res.data);
  })
  .catch(err => {
    console.error('❌ Error al listar facturas:', err.message);
  });