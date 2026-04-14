// proyecto/backEnd/repositories/permiso.js
const { conexion } = require('../config/dataBase');

const PermisoRepositorio = {
  async permisosPorUsuario(usuario) {
    const [userRows] = await conexion.query(
      'SELECT rol FROM usuario WHERE usuario=?',
      [usuario]
    );
    const rol = userRows[0]?.rol;
    if (!rol) return [];

    const [rows] = await conexion.query(
      'SELECT recurso, accion FROM permiso WHERE rol=? AND permitido=1',
      [rol]
    );

    return rows.map(p => `${p.recurso}:${p.accion}`);
  },

  async tienePermiso(rol, recurso, accion) {
    const [rows] = await conexion.query(
      'SELECT permitido FROM permiso WHERE rol=? AND recurso=? AND accion=?',
      [rol, recurso, accion]
    );
    return rows[0]?.permitido === 1;
  },

  async obtenerPermiso() {
    const [rows] = await conexion.query('SELECT * FROM permiso');
    return rows;
  },

  async obtenerPermisoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM permiso WHERE id=?', [id]);
    return rows[0] || null;
  },

  async agregarPermiso({ rol, recurso, accion, permitido }) {
    const query = 'INSERT INTO permiso (rol, recurso, accion, permitido) VALUES (?, ?, ?, ?)';
    const [result] = await conexion.query(query, [rol, recurso, accion, permitido]);
    return { id: result.insertId, rol, recurso, accion, permitido };
  },

  async actualizarPermiso(id, { rol, recurso, accion, permitido }) {
    const query = 'UPDATE permiso SET rol=?, recurso=?, accion=?, permitido=? WHERE id=?';
    await conexion.query(query, [rol, recurso, accion, permitido, id]);
    return { id, rol, recurso, accion, permitido };
  },

  async eliminarPermiso(id) {
    await conexion.query('DELETE FROM permiso WHERE id=?', [id]);
    return { message: `Permiso con id ${id} eliminado` };
  }
};

module.exports = PermisoRepositorio;