// proyecto/backEnd/repositories/rol.js
const { conexion } = require('../config/dataBase');

const RolRepositorio = {
  async obtenerRol() {
    const [rows] = await conexion.query('SELECT * FROM rol');
    return rows.map(r => ({ ...r, label: r.rol }));
  },

  async obtenerRolPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM rol WHERE id = ?', [id]);
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
    const query = 'UPDATE rol SET rol=?, descripcion=?, nota=? WHERE id=?';
    const values = [rol, descripcion, nota, id];
    await conexion.query(query, values);
    return { id, rol, descripcion, nota };
  },

  async eliminarRol(id) {
    await conexion.query('DELETE FROM rol WHERE id=?', [id]);
    return { message: `Rol con id ${id} eliminado` };
  }
};

module.exports = RolRepositorio;