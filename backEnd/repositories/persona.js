// proyecto/backend/src/repositories/persona.js
const { conexion } = require('../config/dataBase');

// ✅ Consultas directas a la tabla persona
const PersonaRepository = {
  // Obtener todas las personas
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM persona');

    // Construir el label concatenado
    return rows.map(p => ({
      ...p,
      label: [
        p.nombre,
        p.segundoNombre,
        p.apellido,
        p.segundoApellido
      ]
        .filter(v => v && v.trim() !== '') // eliminar nulos/vacíos
        .join(' ')
    }));
  },

  // Obtener una persona por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM persona WHERE id = ?', [id]);
    if (!rows[0]) return null;

    const p = rows[0];
    return {
      ...p,
      label: [
        p.nombre,
        p.segundoNombre,
        p.apellido,
        p.segundoApellido
      ]
        .filter(v => v && v.trim() !== '')
        .join(' ')
    };
  },

  // Crear una nueva persona
  async create(persona) {
    const {
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      documento,
      nacimiento,
      sexo,
      email
    } = persona;

    console.log('🧾 Ejecutando INSERT en persona:', {
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      documento,
      nacimiento,
      sexo,
      email
    });

    const query = `
      INSERT INTO persona (nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Normalizar valores: undefined o '' → null
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const values = [
      normalize(nombre),
      normalize(segundoNombre),
      normalize(apellido),
      normalize(segundoApellido),
      normalize(documento),
      normalize(nacimiento),
      normalize(sexo),
      normalize(email)
    ];

    const [result] = await conexion.query(query, values);

    console.log('✅ Persona insertada con ID:', result.insertId);

    return { id: result.insertId, ...persona };
  },

  // Actualizar una persona
  async update(id, persona) {
    const {
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      documento,
      nacimiento,
      sexo,
      email
    } = persona;

    console.log('✏️ Ejecutando UPDATE en persona:', {
      id,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      documento,
      nacimiento,
      sexo,
      email
    });

    const query = `
      UPDATE persona
      SET nombre=?, segundoNombre=?, apellido=?, segundoApellido=?, documento=?, nacimiento=?, sexo=?, email=?
      WHERE id=?
    `;

    // Normalizar valores: undefined o '' → null
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const values = [
      normalize(nombre),
      normalize(segundoNombre),
      normalize(apellido),
      normalize(segundoApellido),
      normalize(documento),
      normalize(nacimiento),
      normalize(sexo),
      normalize(email),
      id
    ];

    await conexion.query(query, values);

    return { id, ...persona };
  },

  // Eliminar una persona
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en persona con ID:', id);
    await conexion.query('DELETE FROM persona WHERE id=?', [id]);
    return { message: `Persona con id ${id} eliminada` };
  }
};

module.exports = PersonaRepository;