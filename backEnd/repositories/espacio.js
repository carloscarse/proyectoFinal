// proyecto/backend/src/repositories/espacio.js
const { conexion } = require('../config/dataBase');

const EspacioRepository = {
  // Obtener todos los espacios
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM espacio');
    return rows.map(e => ({
      ...e,
      label: e.nombre // asumimos que el campo nombre es el label
    }));
  },

  // Obtener un espacio por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM espacio WHERE id = ?', [id]);
    if (!rows[0]) return null;

    const e = rows[0];
    return {
      ...e,
      label: e.nombre
    };
  },

  // Crear un nuevo espacio
  async create(espacio) {
    const { nombre, descripcion, capacidad } = espacio;

    console.log('🧾 Ejecutando INSERT en espacio:', { nombre, descripcion, capacidad });

    const query = 'INSERT INTO espacio (nombre, descripcion, capacidad) VALUES (?, ?, ?)';
    const values = [nombre, descripcion, capacidad];

    const [result] = await conexion.query(query, values);

    console.log('✅ Espacio insertado con ID:', result.insertId);

    return { id: result.insertId, ...espacio };
  },

  // Actualizar un espacio
  async update(id, espacio) {
    const { nombre, descripcion, capacidad } = espacio;

    console.log('✏️ Ejecutando UPDATE en espacio:', { id, nombre, descripcion, capacidad });

    const query = 'UPDATE espacio SET nombre=?, descripcion=?, capacidad=? WHERE id=?';
    const values = [nombre, descripcion, capacidad, id];

    await conexion.query(query, values);

    return { id, ...espacio };
  },

  // Eliminar un espacio
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en espacio con ID:', id);
    await conexion.query('DELETE FROM espacio WHERE id=?', [id]);
    return { message: `Espacio con id ${id} eliminado` };
  }
};

module.exports = EspacioRepository;