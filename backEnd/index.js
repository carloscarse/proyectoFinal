const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Routers
const usuario = require('./router/usuario');
const auth = require('./router/auth');
const persona = require('./router/persona');
const rol = require('./router/rol');
const inquilino = require('./router/inquilino');
const documentacion = require('./router/documentacion'); // ✅ agregado

const PORT = process.env.PORT || 8000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// ✅ Crear carpeta uploads automáticamente y servirla
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📂 Carpeta uploads creada automáticamente');
}
app.use('/uploads', express.static(uploadsDir));

// Rutas
app.use('/', usuario);
app.use('/auth', auth);
app.use('/persona', persona);
app.use('/rol', rol);
app.use('/inquilino', inquilino);
app.use('/', documentacion); // ✅ agregado

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});