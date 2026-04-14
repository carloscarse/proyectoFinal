// testRegistroRubro.js
// Script para probar el registro de un rubro directamente desde Node

require('dotenv').config({ path: './backEnd/.env' });
const axios = require('axios');

// Ajustá el puerto si tu backend corre en otro distinto
const BASE_URL = `http://localhost:${process.env.PORT}/rubro`;

console.log('🟡 Iniciando test de registro de rubro...');

async function registrarRubro() {
  try {
    const nuevoRubro = {
      rubro: 'Comercial',
      descripcion: 'Locales de venta'
    };

    const res = await axios.post(`${BASE_URL}/rubro`, nuevoRubro);

    console.log('🟢 Respuesta OK:', res.data);
  } catch (err) {
    console.error('🔴 Error al registrar rubro:', err.response?.data || err.message);
  }
}

registrarRubro();