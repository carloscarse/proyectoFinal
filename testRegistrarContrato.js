// testRegistrarContrato.js
require('dotenv').config({ path: './backEnd/.env' });
const axios = require('axios');

// ⚠️ Usamos la ruta del router contrato: /contrato/contrato
const BASE_URL = `http://localhost:${process.env.PORT}/contrato/contrato`;

console.log('🟡 Iniciando test de registro de contrato...');

async function registrarContrato() {
  try {
    // ⚠️ Ajustá estos valores con IDs válidos de tu base de datos
    const nuevoContrato = {
      registro: '2025-12-01 10:00:00',     // fecha/hora de registro
      fecha: '2025-12-01 10:00:00',        // fecha del contrato
      condiciones: 'Condiciones iniciales del contrato de prueba',
      inquilino: 15,                        // ID válido de inquilino existente
      espacio: 5,                          // ID válido de espacio existente
      inicio: '2025-12-01 00:00:00',
      fin: '2026-01-01 00:00:00',
      nota: 'Contrato de prueba generado desde test'
    };

    const res = await axios.post(BASE_URL, nuevoContrato);
    console.log('🟢 Contrato registrado:', res.data);
  } catch (err) {
    console.error('🔴 Error al registrar contrato:', err.response?.data || err.message);
  }
}

registrarContrato();