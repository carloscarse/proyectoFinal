// proyecto/testRegistrarServicio.js
const axios = require('axios');

async function main() {
  try {
    console.log('🔎 Probando GET /api/servicio...');
    const resGet = await axios.get('http://localhost:8000/api/servicio');
    console.log('📋 Servicios actuales:', resGet.data);

    console.log('\n📡 Probando POST /api/servicio...');
    const nuevoServicio = {
      servicio: 'Piscina',
      cantidad: 1,
      precio: 5000,
      factura: 14,
      nota: 'Prueba desde testRegistrarServicio'
    };
    const resPost = await axios.post('http://localhost:8000/api/servicio', nuevoServicio);
    console.log('✅ Servicio creado:', resPost.data);

    console.log('\n🔎 Probando GET /api/servicio nuevamente...');
    const resGet2 = await axios.get('http://localhost:8000/api/servicio');
    console.log('📋 Servicios después de crear:', resGet2.data);
  } catch (err) {
    console.error('❌ Error en la prueba:', err.message);
    if (err.response) {
      console.error('📥 Respuesta del servidor:', err.response.data);
    }
  }
}

main();