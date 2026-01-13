// proyecto/backend/src/repositories/rol.js
const { conexion } = require('../config/dataBase');

// ✅ Consultas directas a la tabla rol
const RolRepository = {
  // Obtener todos los roles
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM rol');
    return rows.map(r => ({
      ...r,
      label: r.rol // el label es el campo rol
    }));
  },

  // Obtener un rol por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM rol WHERE id = ?', [id]);
    if (!rows[0]) return null;

    const r = rows[0];
    return {
      ...r,
      label: r.rol
    };
  },

  // Crear un nuevo rol
  async create(rol) {
    const { rol: nombre, descripcion, nota } = rol;

    console.log('🧾 Ejecutando INSERT en rol:', { nombre, descripcion, nota });

    const query = 'INSERT INTO rol (rol, descripcion, nota) VALUES (?, ?, ?)';
    const values = [nombre, descripcion, nota];

    const [result] = await conexion.query(query, values);

    console.log('✅ Rol insertado con ID:', result.insertId);

    return { id: result.insertId, ...rol };
  },

  // Actualizar un rol
  async update(id, rol) {
    const { rol: nombre, descripcion, nota } = rol;

    console.log('✏️ Ejecutando UPDATE en rol:', { id, nombre, descripcion, nota });

    const query = 'UPDATE rol SET rol=?, descripcion=?, nota=? WHERE id=?';
    const values = [nombre, descripcion, nota, id];

    await conexion.query(query, values);

    return { id, ...rol };
  },

  // Eliminar un rol
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en rol con ID:', id);
    await conexion.query('DELETE FROM rol WHERE id=?', [id]);
    return { message: `Rol con id ${id} eliminado` };
  }
};

module.exports = RolRepository;