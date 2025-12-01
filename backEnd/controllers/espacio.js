// backEnd/controllers/espacio.js
const { conexion } = require('../config/dataBase.js');

// Obtener todos los espacios
const mostrarEspacios = async (req, res) => {
  try {
    const [rows] = await conexion.execute('SELECT * FROM espacio');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error al obtener espacios:', err.message);
    res.status(500).json({ success: false, message: 'Error al obtener los espacios', error: err.message });
  }
};

// Obtener un espacio por ID
const mostrarEspacio = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conexion.execute('SELECT * FROM espacio WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Espacio no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Error al obtener espacio:', err.message);
    res.status(500).json({ success: false, message: 'Error al obtener el espacio', error: err.message });
  }
};

// Crear un nuevo espacio
const crearEspacio = async (req, res) => {
  const {
    nombre, estado, ancho, largo, tipo, inquilino,
    precio, rubro, recargoUbicaion, descripcion
  } = req.body;

  if (!nombre || !estado || !ancho || !largo || !tipo || !precio || !rubro) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: nombre, estado, dimensiones, tipo, precio y rubro'
    });
  }

  try {
    const sql = `
      INSERT INTO espacio 
      (nombre, estado, ancho, largo, tipo, inquilino, precio, rubro, recargoUbicaion, descripcion) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      nombre, estado, ancho, largo, tipo, inquilino || null,
      precio, rubro, recargoUbicaion || 0.00, descripcion || null
    ];

    const [result] = await conexion.execute(sql, valores);

    res.json({
      success: true,
      message: '✅ Espacio creado correctamente',
      id: result.insertId
    });
  } catch (err) {
    console.error('❌ Error al crear espacio:', err.message);
    res.status(500).json({ success: false, message: 'Error al crear el espacio', error: err.message });
  }
};

// Editar un espacio existente
const editarEspacio = async (req, res) => {
  const { id } = req.params;
  const {
    nombre, estado, ancho, largo, tipo, inquilino,
    precio, rubro, recargoUbicaion, descripcion
  } = req.body;

  if (!nombre || !estado || !ancho || !largo || !tipo || !precio || !rubro) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: nombre, estado, dimensiones, tipo, precio y rubro'
    });
  }

  try {
    const sql = `
      UPDATE espacio 
      SET nombre = ?, estado = ?, ancho = ?, largo = ?, tipo = ?, inquilino = ?, 
          precio = ?, rubro = ?, recargoUbicaion = ?, descripcion = ?
      WHERE id = ?
    `;
    const valores = [
      nombre, estado, ancho, largo, tipo, inquilino || null,
      precio, rubro, recargoUbicaion || 0.00, descripcion || null, id
    ];

    const [result] = await conexion.execute(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Espacio no encontrado' });
    }

    res.json({
      success: true,
      message: '✅ Espacio actualizado correctamente',
      id
    });
  } catch (err) {
    console.error('❌ Error al editar espacio:', err.message);
    res.status(500).json({ success: false, message: 'Error al editar el espacio', error: err.message });
  }
};

// Eliminar un espacio
const eliminarEspacio = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conexion.execute('DELETE FROM espacio WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Espacio no encontrado' });
    }
    res.json({ success: true, message: '✅ Espacio eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar espacio:', err.message);
    res.status(500).json({ success: false, message: 'Error al eliminar el espacio', error: err.message });
  }
};

module.exports = {
  mostrarEspacios,
  mostrarEspacio,
  crearEspacio,
  editarEspacio,
  eliminarEspacio
};