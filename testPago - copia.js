// proyecto/testPago.js
const axios = require('axios');

async function testPago() {
  console.log('🟡 Iniciando test de lista de pagos...');
  try {
    // Ajustá la URL si tu backend corre en otro puerto
    const res = await axios.get('http://localhost:8000/pago/pagos');
    const pagos = res.data;

    if (!pagos || pagos.length === 0) {
      console.log('⚠️ No hay pagos registrados en la base de datos.');
    } else {
      console.log('🟢 Pagos encontrados:');
      pagos.forEach(p => {
        console.log(
          `ID: ${p.id} | Fecha: ${p.fecha} | Usuario: ${p.usuario} | Factura: ${p.factura} | Inquilino: ${p.inquilino} | Nota: ${p.nota}`
        );
      });
    }
  } catch (error) {
    console.error('❌ Error al consultar pagos:', error.message);
  }
}

testPago();