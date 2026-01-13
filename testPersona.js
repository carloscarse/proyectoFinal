// proyecto/testPersona.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const axios = require('axios');

// 🔐 Generar token con rol 1 (administrador)
const token = jwt.sign(
  { id: 99, usuario: 'testadmin', rol: 1 },
  process.env.CLAVE_ENCRIPTADO,
  { expiresIn: '1h' }
);

// 📡 Ejecutar consulta al backend
axios.get('http://localhost:8000/api/persona', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  console.log('✅ Respuesta del backend:', res.data);
})
.catch(err => {
  console.error('❌ Error al consultar personas:', err.response?.data || err.message);
});