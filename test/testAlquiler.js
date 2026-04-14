// testAlquiler.js
require('dotenv').config({ path: './backEnd/.env' });
const axios = require('axios');

const BASE_URL = `http://localhost:${process.env.PORT}/alquiler/alquileres`;

console.log('🟡 Iniciando test de lectura de alquileres...');

async function leerAlquileres() {
  try {
    const res = await axios.get(BASE_URL);
    console.log('🟢 Alquileres obtenidos:', res.data);
  } catch (err) {
    console.error('🔴 Error al obtener alquileres:', err.response?.data || err.message);
  }
}

leerAlquileres();