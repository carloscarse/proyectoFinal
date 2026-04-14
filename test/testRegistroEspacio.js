// testRegistroEspacio.js
// Script para probar POST /espacio/espacio

require('dotenv').config({ path: './backEnd/.env' });
const axios = require('axios');

const BASE_URL = `http://localhost:${process.env.PORT}/espacio`;

console.log('🟡 Iniciando test de registro de espacio...');

async function registrarEspacio() {
  try {
    const nuevoEspacio = {
      nombre: 'Local 101',          // ✅ obligatorio
      estado: 'libre',              // ✅ obligatorio
      ancho: 5,                     // ✅ obligatorio
      largo: 10,                    // ✅ obligatorio
      tipo: 'Local comercial',      // ✅ obligatorio
      inquilino: 15,                 // FK (asegurate que exista)
      precio: 1000,                 // ✅ obligatorio
      rubro: 2,                     // FK (el rubro que creaste)
      recargoUbicacion: 0.15,       // opcional
      descripcion: 'Primera prueba desde script'
    };

    const res = await axios.post(`${BASE_URL}/espacio`, nuevoEspacio);
    console.log('🟢 Espacio registrado:', res.data);
  } catch (err) {
    console.error('🔴 Error al registrar espacio:', err.response?.data || err.message);
  }
}

registrarEspacio();