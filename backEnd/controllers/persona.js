const { conexion } = require('../config/dataBase.js');

// Crear una nueva persona
const crearPersona = async (req, res) => {
  console.log('🟡 [crearPersona] Recibido:', req.body);

  const {
    nombre = null,
    segundoNombre = null,
    apellido = null,
    segundoApellido = null,
    documento = null,
    nacimiento = null,
    sexo = null,
    email = null
  } = req.body;

  // Validación: al menos uno de los 4 campos principales no debe ser nulo
  if (!nombre && !segundoNombre && !apellido && !segundoApellido) {
    return res.status(400).json({
      error: 'Debe ingresar al menos un nombre o apellido'
    });
  }

  const sql = `
    INSERT INTO persona (nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const valores = [nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email];

  try {
    const [results] = await conexion.query(sql, valores);
    console.log('🟢 Persona creada con ID:', results.insertId);

    const partes = [nombre, segundoNombre, apellido, segundoApellido];
    const label = partes.filter(v => v && v !== 'null').join(' ');

    res.json({
      message: 'Persona creada correctamente',
      id: results.insertId,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      documento,
      nacimiento,
      sexo,
      email,
      label
    });
  } catch (error) {
    console.error('🔴 Error al crear persona:', error.message);
    res.status(500).json({ error: 'Error al crear persona', detalle: error.message });
  }
};

// Mostrar todas las personas
const mostrarPersonas = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM persona');

    const personasConLabel = results.map(p => {
      const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
      const label = partes.filter(v => v && v !== 'null').join(' ');
      return { ...p, label };
    });

    res.json(personasConLabel);
  } catch (error) {
    console.error('🔴 Error al obtener personas:', error.message);
    res.status(500).json({ error: 'Error al obtener personas', detalle: error.message });
  }
};

// Mostrar una persona por ID
const mostrarPersona = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('SELECT * FROM persona WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const p = results[0];
    const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
    const label = partes.filter(v => v && v !== 'null').join(' ');

    res.json({ ...p, label });
  } catch (error) {
    console.error('🔴 Error al obtener persona:', error.message);
    res.status(500).json({ error: 'Error al obtener persona', detalle: error.message });
  }
};

// Editar una persona
const editarPersona = async (req, res) => {
  const { id } = req.params;
  const {
    nombre = null,
    segundoNombre = null,
    apellido = null,
    segundoApellido = null,
    documento = null,
    nacimiento = null,
    sexo = null,
    email = null
  } = req.body;

  if (!nombre && !segundoNombre && !apellido && !segundoApellido) {
    return res.status(400).json({
      error: 'Debe ingresar al menos un nombre o apellido'
    });
  }

  const sql = `
    UPDATE persona
    SET nombre = ?, segundoNombre = ?, apellido = ?, segundoApellido = ?, documento = ?, nacimiento = ?, sexo = ?, email = ?
    WHERE id = ?
  `;
  const valores = [nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email, id];

  try {
    const [results] = await conexion.query(sql, valores);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const partes = [nombre, segundoNombre, apellido, segundoApellido];
    const label = partes.filter(v => v && v !== 'null').join(' ');

    res.json({ id, nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email, label });
  } catch (error) {
    console.error('🔴 Error al editar persona:', error.message);
    res.status(500).json({ error: 'Error al editar persona', detalle: error.message });
  }
};

// Eliminar una persona
const eliminarPersona = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('DELETE FROM persona WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('🔴 Error al eliminar persona:', error.message);
    res.status(500).json({ error: 'Error al eliminar persona', detalle: error.message });
  }
};

module.exports = {
  crearPersona,
  mostrarPersonas,
  mostrarPersona,
  editarPersona,
  eliminarPersona
};