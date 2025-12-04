const { conexion } = require('../config/dataBase.js');

// Obtener todos los inquilinos
const mostrarInquilinos = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM inquilino');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los inquilinos', detalle: error.message });
  }
};

// Obtener un inquilino por ID
const mostrarInquilino = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('SELECT * FROM inquilino WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Inquilino no encontrado' });
    }
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inquilino', detalle: error.message });
  }
};

// Crear un nuevo inquilino
const crearInquilino = async (req, res) => {
  const { persona, alta } = req.body;
  if (!persona || !alta) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const sql = 'INSERT INTO inquilino (persona, alta) VALUES (?, ?)';
    const [result] = await conexion.query(sql, [persona, alta]);
    res.json({ message: 'Inquilino creado correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el inquilino', detalle: error.message });
  }
};

// Editar un inquilino existente
const editarInquilino = async (req, res) => {
  const { id } = req.params;
  const { persona, alta } = req.body;
  try {
    const sql = 'UPDATE inquilino SET persona = ?, alta = ? WHERE id = ?';
    const [results] = await conexion.query(sql, [persona, alta, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Inquilino no encontrado' });
    }
    res.json({ message: 'Inquilino actualizado correctamente', id, persona, alta });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el inquilino', detalle: error.message });
  }
};

// Eliminar un inquilino
const eliminarInquilino = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('DELETE FROM inquilino WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Inquilino no encontrado' });
    }
    res.json({ message: 'Inquilino eliminado correctamente', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el inquilino', detalle: error.message });
  }
};

// Obtener un inquilino con su label completo
const mostrarInquilinoLabel = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conexion.query(`
      SELECT i.id,
             CONCAT_WS(' ', p.nombre, p.segundoNombre, p.apellido, p.segundoApellido) AS label
      FROM inquilino i
      JOIN persona p ON i.persona = p.id
      WHERE i.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Inquilino no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inquilino label', detalle: error.message });
  }
};

// Obtener todos los inquilinos con su label completo
const mostrarInquilinosLabel = async (req, res) => {
  try {
    const [rows] = await conexion.query(`
      SELECT i.id,
             CONCAT_WS(' ', p.nombre, p.segundoNombre, p.apellido, p.segundoApellido) AS label
      FROM inquilino i
      JOIN persona p ON i.persona = p.id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inquilinos label', detalle: error.message });
  }
};

module.exports = {
  mostrarInquilinos,
  mostrarInquilino,
  crearInquilino,
  editarInquilino,
  eliminarInquilino,
  mostrarInquilinoLabel,
  mostrarInquilinosLabel
};