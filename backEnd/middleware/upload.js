const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // carpeta uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filtro de tipos permitidos (solo PDF e imágenes)
const fileFilter = (req, file, cb) => {
  const allowed = /pdf|jpg|jpeg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('❌ Tipo de archivo no permitido. Solo PDF e imágenes'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;