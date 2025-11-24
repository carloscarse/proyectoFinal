const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { conexion } = require('../config/dataBase');

exports.login = async (req, res) => {
  console.log('🔶 login() llamado');
  const { usuario, clave } = req.body;
  console.log(`📥 Datos recibidos: usuario="${usuario}", clave="${clave}"`);

  try {
    console.log('🔎 Ejecutando consulta SQL...');
    const [resultado] = await conexion.query(
      'SELECT * FROM usuario WHERE usuario = ?',
      [usuario]
    );
    console.log('📦 Resultado SQL:', resultado);

    if (!resultado || resultado.length === 0) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = resultado[0];
    console.log(`🔍 Usuario encontrado: id=${user.id}, rol=${user.rol}, clave=${user.clave}`);

    console.log('🔐 Comparando claves...');
    const claveCorrecta = await bcrypt.compare(clave, user.clave);
    console.log(`🔐 Resultado comparación: ${claveCorrecta ? '✅ Coinciden' : '❌ No coinciden'}`);

    if (!claveCorrecta) {
      return res.status(401).json({ error: 'Clave incorrecta' });
    }

    console.log('🎫 Generando token...');
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.rol },
      process.env.CLAVE_ENCRIPTADO,
      { expiresIn: '1h' }
    );
    console.log('🎫 Token generado:', token);

    return res.json({
      token,
      usuario: user.usuario,
      rol: user.rol
    });
  } catch (error) {
    console.error('❌ Error atrapado en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};