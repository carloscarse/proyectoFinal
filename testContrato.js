// testContrato.js
require('dotenv').config({ path: './backEnd/.env' });
const axios = require('axios');

// ⚠️ Usamos la ruta del router contrato: /contrato/contratos
const BASE_URL = `http://localhost:${process.env.PORT}/contrato/contratos`;

console.log('🟡 Iniciando test de lectura de contratos...');

async function leerContratos() {
  try {
    const res = await axios.get(BASE_URL);
    console.log('🟢 Contratos obtenidos:', res.data);
  } catch (err) {
    console.error('🔴 Error al obtener contratos:', err.response?.data || err.message);
  }
}

leerContratos();