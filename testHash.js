const bcrypt = require('bcrypt');

const claveOriginal = 'admin123';

// Pegá el hash real desde MySQL Workbench
const hashes = [
  '$2b$10$PbkYxO.dd639sjJKG2DJguev8vrjTs2S43PhWv6e.qHCxvRoD1pgm' // ← reemplazá por el hash completo de admin4
];

hashes.forEach((hash, i) => {
  bcrypt.compare(claveOriginal, hash)
    .then(resultado => {
      console.log(`Hash ${i + 1}: ¿Coincide la clave?`, resultado);
    })
    .catch(error => {
      console.error(`❌ Error al comparar hash ${i + 1}:`, error);
    });
});