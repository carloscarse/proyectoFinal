// proyecto/backend/src/repositories/rubro.js
const { conexion } = require('../config/dataBase');

// ✅ Consultas directas a la tabla rubro
const RubroRepository = {
  // Obtener todos los rubros
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM rubro');
    return rows.map(r => ({
      ...r,
      label: r.rubro // el label es el campo rubro
    }));
  },

  // Obtener un rubro por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM rubro WHERE id = ?', [id]);
    if (!rows[0]) return null;

    const r = rows[0];
    return {
      ...r,
      label: r.rubro
    };
  },

  // Crear un nuevo rubro
  async create(rubro) {
    const { rubro: nombre, descripcion } = rubro;

    console.log('🧾 Ejecutando INSERT en rubro:', { nombre, descripcion });

    const query = 'INSERT INTO rubro (rubro, descripcion) VALUES (?, ?)';
    const values = [nombre, descripcion];

    const [result] = await conexion.query(query, values);

    console.log('✅ Rubro insertado con ID:', result.insertId);

    return { id: result.insertId, ...rubro };
  },

  // Actualizar un rubro
  async update(id, rubro) {
    const { rubro: nombre, descripcion } = rubro;

    console.log('✏️ Ejecutando UPDATE en rubro:', { id, nombre, descripcion });

    const query = 'UPDATE rubro SET rubro=?, descripcion=? WHERE id=?';
    const values = [nombre, descripcion, id];

    await conexion.query(query, values);

    return { id, ...rubro };
  },

  // Eliminar un rubro
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en rubro con ID:', id);
    await conexion.query('DELETE FROM rubro WHERE id=?', [id]);
    return { message: `Rubro con id ${id} eliminado` };
  }
};

module.exports = RubroRepository;