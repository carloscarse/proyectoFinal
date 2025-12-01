const { conexion } = require('../config/dataBase.js');

// Obtener todos los rubros
const mostrarRubros = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM rubro');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los rubros', detalle: error.message });
  }
};

// Obtener un rubro por ID
const mostrarRubro = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('SELECT * FROM rubro WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Rubro no encontrado' });
    }
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rubro', detalle: error.message });
  }
};

// Crear un nuevo rubro
const crearRubro = async (req, res) => {
  const { rubro, descripcion } = req.body;

  if (!rubro || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos requeridos: rubro y descripción' });
  }

  try {
    const [results] = await conexion.query(
      'INSERT INTO rubro (rubro, descripcion) VALUES (?, ?)',
      [rubro, descripcion]
    );
    res.json({
      message: 'Rubro creado correctamente',
      id: results.insertId,
      rubro,
      descripcion
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rubro', detalle: error.message });
  }
};

// Editar un rubro existente
const editarRubro = async (req, res) => {
  const { id } = req.params;
  const { rubro, descripcion } = req.body;

  if (!rubro || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos requeridos: rubro y descripción' });
  }

  try {
    const [results] = await conexion.query(
      'UPDATE rubro SET rubro = ?, descripcion = ? WHERE id = ?',
      [rubro, descripcion, id]
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Rubro no encontrado' });
    }
    res.json({ id, rubro, descripcion });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el rubro', detalle: error.message });
  }
};

// Eliminar un rubro
const eliminarRubro = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('DELETE FROM rubro WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Rubro no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rubro', detalle: error.message });
  }
};

module.exports = {
  mostrarRubros,
  mostrarRubro,
  crearRubro,
  editarRubro,
  eliminarRubro
};