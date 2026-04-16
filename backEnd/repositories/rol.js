// proyecto/backEnd/repositories/rol.js
const { conexion } = require('../config/dataBase');

const RolRepositorio = {
  async obtenerRol() {
    const [rows] = await conexion.query('SELECT * FROM rol WHERE borrado = FALSE');
    return rows.map(r => ({ ...r, label: r.rol }));
  },

  async obtenerRolPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM rol WHERE id = ? AND borrado = FALSE', [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    return { ...r, label: r.rol };
  },

  async agregarRol({ rol, descripcion, nota }) {
    const query = 'INSERT INTO rol (rol, descripcion, nota) VALUES (?, ?, ?)';
    const values = [rol, descripcion, nota];
    const [result] = await conexion.query(query, values);
    return { id: result.insertId, rol, descripcion, nota };
  },

  async actualizarRol(id, { rol, descripcion, nota }) {
    const query = 'UPDATE rol SET rol=?, descripcion=?, nota=? WHERE id=? AND borrado = FALSE';
    const values = [rol, descripcion, nota, id];
    await conexion.query(query, values);
    return { id, rol, descripcion, nota };
  },

  // 🔹 Borrado lógico (default)
  async eliminarRol(id) {
    await conexion.query('UPDATE rol SET borrado = TRUE WHERE id=?', [id]);
    return { message: `Rol con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarRolFisico(id) {
    await conexion.query('DELETE FROM rol WHERE id=?', [id]);
    return { message: `Rol con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerRolesEliminados() {
    const [rows] = await conexion.query('SELECT * FROM rol WHERE borrado = TRUE');
    return rows;
  },

  async obtenerRolEliminadoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM rol WHERE id=? AND borrado = TRUE', [id]);
    return rows[0] || null;
  }
};

module.exports = RolRepositorio;