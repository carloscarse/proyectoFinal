require('dotenv').config({ path: './backEnd/.env' });
const { mostrarPersonas } = require('./backEnd/controllers/persona');

console.log('🟡 Iniciando test de mostrarPersonas...');

const req = {}; // No se necesita nada para mostrar todas
const res = {
  status: (code) => ({
    json: (data) => {
      console.log(`🔴 Status ${code}:`, data);
    }
  }),
  json: (data) => {
    console.log('🟢 Respuesta OK:', data);
  }
};

mostrarPersonas(req, res);