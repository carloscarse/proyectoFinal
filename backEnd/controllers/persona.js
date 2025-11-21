const { conexion } = require('../config/dataBase.js');

// Crear una nueva persona (sin campos obligatorios)
const crearPersona = (req, res) => {
  console.log('🟡 [crearPersona] Recibido:', req.body);

  const {
    nombre = '',
    segundoNombre = '',
    apellido = '',
    segundoApellido = '',
    documento = '',
    nacimiento = '',
    sexo = '',
    email = ''
  } = req.body;

  const sql = `
    INSERT INTO persona
    (nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email];

  console.log('🟡 [crearPersona] Ejecutando SQL:', sql);
  console.log('🟡 [crearPersona] Valores:', valores);

  conexion.query(sql, valores, (error, results) => {
    if (error) {
      console.error('🔴 [crearPersona] Error al insertar:', error.message);
      return res.status(500).json({
        error: 'Error al crear la persona',
        detalle: error.message
      });
    }

    console.log('🟢 [crearPersona] Persona creada con ID:', results.insertId);

    res.json({
      message: 'Persona creada correctamente',
      id: results.insertId
    });
  });
};

// Otros controladores (completos y trazables)
const mostrarPersonas = (req, res) => {
  conexion.query('SELECT * FROM persona', (error, results) => {
    if (error) {
      console.error('🔴 Error al obtener personas:', error.message);
      return res.status(500).json({ error: 'Error al obtener las personas' });
    }
    console.log('🟢 Personas obtenidas:', results.length);
    res.json(results);
  });
};

const mostrarPersona = (req, res) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM persona WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('🔴 Error al obtener persona:', error.message);
      return res.status(500).json({ error: 'Error al obtener la persona' });
    }
    if (results.length === 0) {
      console.warn('⚠️ Persona no encontrada:', id);
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    console.log('🟢 Persona encontrada:', results[0]);
    res.json(results[0]);
  });
};

const editarPersona = (req, res) => {
  const { id } = req.params;
  const { nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email } = req.body;

  const sql = `
    UPDATE persona
    SET nombre = ?, segundoNombre = ?, apellido = ?, segundoApellido = ?, documento = ?, nacimiento = ?, sexo = ?, email = ?
    WHERE id = ?
  `;

  const valores = [nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email, id];

  conexion.query(sql, valores, (error, results) => {
    if (error) {
      console.error('🔴 Error al editar persona:', error.message);
      return res.status(500).json({ error: 'Error al editar la persona' });
    }
    if (results.affectedRows === 0) {
      console.warn('⚠️ Persona no encontrada para editar:', id);
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    console.log('🟢 Persona actualizada:', id);
    res.json({ id, nombre, apellido, documento, email });
  });
};

const eliminarPersona = (req, res) => {
  const { id } = req.params;

  conexion.query('DELETE FROM persona WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('🔴 Error al eliminar persona:', error.message);
      return res.status(500).json({ error: 'Error al eliminar la persona' });
    }
    if (results.affectedRows === 0) {
      console.warn('⚠️ Persona no encontrada para eliminar:', id);
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    console.log('🟢 Persona eliminada:', id);
    res.status(204).send();
  });
};

module.exports = {
  mostrarPersonas,
  mostrarPersona,
  crearPersona,
  editarPersona,
  eliminarPersona
};