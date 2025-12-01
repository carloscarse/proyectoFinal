// testRegistrarAlquiler.js
require('dotenv').config({ path: './backEnd/.env' });
const axios = require('axios');

const BASE_URL = `http://localhost:${process.env.PORT}/alquiler/alquiler`;

console.log('🟡 Iniciando test de registro de alquiler...');

async function registrarAlquiler() {
  try {
    // ⚠️ Ajustá estos valores con IDs válidos de tu base de datos
    const nuevoAlquiler = {
      contrato: 'CONTRATO-001',
      espacio: 1,              // ID válido de espacio
      inicio: '2025-12-01',
      fin: '2026-01-01',
      estado: 'activo',
      nota: 'Primer alquiler de prueba'
    };

    const res = await axios.post(BASE_URL, nuevoAlquiler);
    console.log('🟢 Alquiler registrado:', res.data);
  } catch (err) {
    console.error('🔴 Error al registrar alquiler:', err.response?.data || err.message);
  }
}

registrarAlquiler();