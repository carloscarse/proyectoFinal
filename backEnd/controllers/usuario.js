const { conexion } = require('../config/dataBase.js');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const mostrarUsuarios = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM usuario');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', detalle: error.message });
  }
};

// Obtener un usuario por ID
const mostrarUsuario = (req, res) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM usuario WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { usuario, clave, persona, rol, estado, creacion, ultimoAcceso } = req.body;

  if (!usuario || !clave || !persona || !rol || !estado || !creacion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const hash = await bcrypt.hash(clave, 10);

    const sql = 'INSERT INTO usuario (usuario, clave, persona, rol, estado, creacion, ultimoAcceso) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const valores = [usuario, hash, persona, rol, estado, creacion, ultimoAcceso || null];

    const [result] = await conexion.query(sql, valores);

    res.json({ message: 'Usuario creado correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', detalle: error.message });
  }
};

// Editar un usuario existente
const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { usuario, clave, persona, rol, estado } = req.body;

  try {
    const sql = 'UPDATE usuario SET usuario = ?, clave = ?, persona = ?, rol = ?, estado = ? WHERE id = ?';
    const valores = [usuario, clave, persona, rol, estado, id];

    const [results] = await conexion.query(sql, valores);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 👇 Respuesta clara al frontend
    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      id,
      usuario,
      persona,
      rol,
      estado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el usuario', detalle: error.message });
  }
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
  const { id } = req.params;

  conexion.query('DELETE FROM usuario WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).send();
  });
};

// Actualizar último acceso
const actualizarUltimoAcceso = (req, res) => {
  const { id } = req.params;
  const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");

  conexion.query('UPDATE usuario SET ultimoAcceso = ? WHERE id = ?', [fecha, id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al actualizar último acceso' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Último acceso actualizado' });
  });
};

// Login de usuario
const loginUsuario = (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ error: 'Faltan datos de login' });
  }

  const sql = 'SELECT * FROM usuario WHERE usuario = ? AND clave = ?';
  conexion.query(sql, [usuario, clave], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error en login' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    res.json(results[0]);
  });
};

module.exports = {
  mostrarUsuarios,
  mostrarUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  actualizarUltimoAcceso,
  loginUsuario
};