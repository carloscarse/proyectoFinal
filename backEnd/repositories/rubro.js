// proyecto/backend/src/repositories/rubro.js
const { conexion } = require('../config/dataBase');

// ✅ Consultas directas a la tabla rubro
const RubroRepository = {
  // Obtener todos los rubros
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM rubro');

    // Construir el label desde el campo rubro
    return rows.map(r => ({
      ...r,
      label: r.rubro?.trim() || ''
    }));
  },

  // Obtener un rubro por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM rubro WHERE id = ?', [id]);
    if (!rows[0]) return null;

    const r = rows[0];
    return {
      ...r,
      label: r.rubro?.trim() || ''
    };
  },

  // Crear un nuevo rubro
  async create(rubroData) {
    const { rubro, descripcion } = rubroData;

    console.log('🧾 Ejecutando INSERT en rubro:', { rubro, descripcion });

    const query = `
      INSERT INTO rubro (rubro, descripcion)
      VALUES (?, ?)
    `;

    const normalize = val => (val === undefined || val === '' ? null : val);

    const values = [
      normalize(rubro),
      normalize(descripcion)
    ];

    const [result] = await conexion.query(query, values);

    console.log('✅ Rubro insertado con ID:', result.insertId);

    return { id: result.insertId, ...rubroData };
  },

  // Actualizar un rubro
  async update(id, rubroData) {
    const { rubro, descripcion } = rubroData;

    console.log('✏️ Ejecutando UPDATE en rubro:', { id, rubro, descripcion });

    const query = `
      UPDATE rubro
      SET rubro=?, descripcion=?
      WHERE id=?
    `;

    const normalize = val => (val === undefined || val === '' ? null : val);

    const values = [
      normalize(rubro),
      normalize(descripcion),
      id
    ];

    await conexion.query(query, values);

    return { id, ...rubroData };
  },

  // Eliminar un rubro
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en rubro con ID:', id);
    await conexion.query('DELETE FROM rubro WHERE id=?', [id]);
    return { message: `Rubro con id ${id} eliminado` };
  }
};

module.exports = RubroRepository;