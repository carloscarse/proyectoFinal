const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

// Routers
const usuario = require('./router/usuario');
const auth = require('./router/auth');
const persona = require('./router/persona');
const rol = require('./router/rol');
const inquilino = require('./router/inquilino'); // ✅ agregado

const PORT = process.env.PORT || 8000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Rutas
app.use('/', usuario);
app.use('/auth', auth);
app.use('/persona', persona);
app.use('/rol', rol);
app.use('/inquilino', inquilino); // ✅ agregado

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});