require('dotenv').config({ path: './backEnd/.env' });
const { mostrarRoles } = require('./backEnd/controllers/rol');

console.log('🟡 Iniciando test de mostrarRoles...');

const req = {}; // No se necesita nada para esta prueba
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

mostrarRoles(req, res);