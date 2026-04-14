require('dotenv').config({ path: './backEnd/.env' });
const { mostrarServicios } = require('./backEnd/controllers/servicio');

const req = {}; // No necesitamos parámetros para mostrar todos los servicios

const res = {
  status: (code) => ({
    json: (data) => console.log(`Status ${code}:`, data)
  }),
  json: (data) => console.log('Respuesta:', data)
};

mostrarServicios(req, res);