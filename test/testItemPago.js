// proyecto/testItemPago.js
const axios = require('axios');

async function testItemPago() {
  console.log('🟡 Iniciando test de lista de items de pago...');
  try {
    // Ajustá la URL si tu backend corre en otro puerto
    const res = await axios.get('http://localhost:8000/itempago/itempagos');
    const items = res.data;

    if (!items || items.length === 0) {
      console.log('⚠️ No hay items de pago registrados en la base de datos.');
    } else {
      console.log('🟢 Items de pago encontrados:');
      items.forEach(it => {
        console.log(
          `ID: ${it.id} | Pago: ${it.pago} | Concepto: ${it.concepto} | Monto: ${it.monto}`
        );
      });
    }
  } catch (error) {
    console.error('❌ Error al consultar items de pago:', error.message);
    if (error.response) {
      console.error('Detalles:', error.response.data);
    }
  }
}

testItemPago();