// testEspacio.js
// Script para probar GET /espacio/espacios

require('dotenv').config({ path: './backEnd/.env' });
const axios = require('axios');

const BASE_URL = `http://localhost:${process.env.PORT}/espacio`;

console.log('🔎 Probando GET /espacios ...');

async function mostrarEspacios() {
  try {
    const res = await axios.get(`${BASE_URL}/espacios`);
    console.log('🟢 Espacios obtenidos:', res.data);
  } catch (err) {
    console.error('🔴 Error al obtener espacios:', err.response?.data || err.message);
  }
}

mostrarEspacios();