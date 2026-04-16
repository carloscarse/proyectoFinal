// proyecto/backEnd/repositories/persona.js
const { conexion } = require('../config/dataBase');

const PersonaRepositorio = {
  async obtenerPersona() {
    const [rows] = await conexion.query('SELECT * FROM persona WHERE borrado = FALSE');
    return rows.map(p => ({
      ...p,
      label: [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido]
        .filter(v => v && v.trim() !== '')
        .join(' ')
    }));
  },

  async obtenerPersonaPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM persona WHERE id = ? AND borrado = FALSE', [id]);
    if (!rows[0]) return null;
    const p = rows[0];
    return {
      ...p,
      label: [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido]
        .filter(v => v && v.trim() !== '')
        .join(' ')
    };
  },

  async agregarPersona(persona) {
    const { nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email } = persona;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      INSERT INTO persona (nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
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
    return { id: result.insertId, ...persona };
  },

  async actualizarPersona(id, persona) {
    const { nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email } = persona;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      UPDATE persona
      SET nombre=?, segundoNombre=?, apellido=?, segundoApellido=?, documento=?, nacimiento=?, sexo=?, email=?
      WHERE id=? AND borrado = FALSE
    `;
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

  // 🔹 Borrado lógico (default)
  async eliminarPersona(id) {
    await conexion.query(`
      UPDATE persona
      SET borrado = TRUE
      WHERE id=?
    `, [id]);
    return { message: `Persona con id ${id} marcada como borrada (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarPersonaFisico(id) {
    await conexion.query('DELETE FROM persona WHERE id=?', [id]);
    return { message: `Persona con id ${id} eliminada físicamente (borrado definitivo)` };
  },

  async obtenerPersonasEliminadas() {
    const [rows] = await conexion.query('SELECT * FROM persona WHERE borrado = TRUE');
    return rows;
  },

  async obtenerPersonaEliminadaPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM persona WHERE borrado = TRUE AND id = ?', [id]);
    return rows[0] || null;
  }
};

module.exports = PersonaRepositorio;