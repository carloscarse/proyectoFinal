const bcrypt = require('bcryptjs');

const clavePlano = 'admin';
bcrypt.hash(clavePlano, 10, (err, hash) => {
  if (err) {
    console.error('❌ Error al encriptar:', err);
  } else {
    console.log('🔐 Clave encriptada:', hash);
  }
});