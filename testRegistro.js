require('dotenv').config({ path: './backEnd/.env' });
const bcrypt = require('bcrypt');
const { conexion } = require('./backEnd/config/dataBase');

const nuevoUsuario = {
  usuario: 'admin00',
  clave: 'admin',
  persona: 1,
  rol: 1,
  estado: 'activo',
  creacion: new Date()
};

bcrypt.hash(nuevoUsuario.clave, 10, (err, hash) => {
  if (err) {
    console.error('❌ Error al encriptar la clave:', err);
    return;
  }

  const sql = `
    INSERT INTO usuario (usuario, clave, persona, rol, estado, creacion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valores = [
    nuevoUsuario.usuario,
    hash,
    nuevoUsuario.persona,
    nuevoUsuario.rol,
    nuevoUsuario.estado,
    nuevoUsuario.creacion
  ];

  conexion.query(sql, valores, (error, results) => {
    if (error) {
      console.error('❌ Error al insertar el usuario:', error);
    } else {
      console.log('✅ Usuario insertado correctamente con ID:', results.insertId);
    }
    process.exit();
  });
});