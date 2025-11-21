require('dotenv').config({ path: './backEnd/.env' });
const { login } = require('./backEnd/controllers/authController');

const req = {
  body: {
    usuario: 'admin4',     // el que insertaste recién
    clave: 'admin123'      // la clave original sin encriptar
  }
};

const res = {
  status: (code) => ({
    json: (data) => console.log(`Status ${code}:`, data)
  }),
  json: (data) => console.log('✅ Login exitoso:', data)
};

login(req, res);