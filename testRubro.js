// testRubro.js
// Script de prueba para endpoints de Rubro

const axios = require('axios');

// Cambiá el puerto si tu backend corre en otro distinto
const BASE_URL = 'http://localhost:3000/rubro';

async function probarRubros() {
  try {
    console.log('🔎 Probando GET /rubros ...');
    const resGet = await axios.get(`${BASE_URL}/rubros`);
    console.log('✅ Rubros obtenidos:', resGet.data);

    console.log('\n🔎 Probando POST /rubro ...');
    const nuevoRubro = {
      rubro: 'Comercial',
      descripcion: 'Locales de venta'
    };
    const resPost = await axios.post(`${BASE_URL}/rubro`, nuevoRubro);
    console.log('✅ Rubro creado:', resPost.data);

    const nuevoId = resPost.data.id;

    console.log(`\n🔎 Probando GET /rubro/${nuevoId} ...`);
    const resGetById = await axios.get(`${BASE_URL}/rubro/${nuevoId}`);
    console.log('✅ Rubro por ID:', resGetById.data);

    console.log(`\n🔎 Probando PUT /rubro/${nuevoId} ...`);
    const actualizado = {
      rubro: 'Comercial actualizado',
      descripcion: 'Locales de venta y servicios'
    };
    const resPut = await axios.put(`${BASE_URL}/rubro/${nuevoId}`, actualizado);
    console.log('✅ Rubro actualizado:', resPut.data);

    console.log(`\n🔎 Probando DELETE /rubro/${nuevoId} ...`);
    await axios.delete(`${BASE_URL}/rubro/${nuevoId}`);
    console.log('✅ Rubro eliminado correctamente');
  } catch (err) {
    console.error('❌ Error en la prueba:', err.response?.data || err.message);
  }
}

probarRubros();