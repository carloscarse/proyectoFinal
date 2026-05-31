// proyecto/backEnd/repositories/logMovimiento.js

const { conexion } = require('../config/dataBase');

const LogMovimientoRepositorio = {
  async agregarLogMovimiento({ usuario, accion, entidad, campo, previo, nuevo, ip, detalle }) {
    const sql = `
      INSERT INTO logmovimiento (usuario, accion, entidad, campo, previo, nuevo, ip, detalle)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [usuario, accion, entidad, campo, previo, nuevo, ip, detalle];
    const [result] = await conexion.query(sql, params);
    return result.insertId;
  },

  async obtenerLogMovimiento() {
    const sql = `SELECT * FROM logmovimiento WHERE borrado = FALSE ORDER BY fecha DESC`;
    const [rows] = await conexion.query(sql);
    return rows;
  },

  async obtenerLogMovimientoPorId(id) {
    const sql = `SELECT * FROM logmovimiento WHERE id = ? AND borrado = FALSE`;
    const [rows] = await conexion.query(sql, [id]);
    return rows[0] || null;
  },

  async actualizarLogMovimiento(id, { usuario, accion, entidad, campo, previo, nuevo, ip, detalle }) {
    const sql = `
      UPDATE logmovimiento
      SET usuario=?, accion=?, entidad=?, campo=?, previo=?, nuevo=?, ip=?, detalle=?
      WHERE id=? AND borrado = FALSE
    `;
    const params = [usuario, accion, entidad, campo, previo, nuevo, ip, detalle, id];
    const [result] = await conexion.query(sql, params);
    return result.affectedRows;
  },

  // 🔹 Borrado lógico (default)
  async eliminarLogMovimiento(id) {
    const sql = `UPDATE logmovimiento SET borrado = TRUE WHERE id=?`;
    const [result] = await conexion.query(sql, [id]);
    return result.affectedRows;
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarLogMovimientoFisico(id) {
    const sql = `DELETE FROM logmovimiento WHERE id=?`;
    const [result] = await conexion.query(sql, [id]);
    return result.affectedRows;
  },

  async obtenerLogsEliminados() {
    const sql = `SELECT * FROM logmovimiento WHERE borrado = TRUE ORDER BY fecha DESC`;
    const [rows] = await conexion.query(sql);
    return rows;
  },

  async obtenerLogEliminadoPorId(id) {
    const sql = `SELECT * FROM logmovimiento WHERE id = ? AND borrado = TRUE`;
    const [rows] = await conexion.query(sql, [id]);
    return rows[0] || null;
  }
};

module.exports = LogMovimientoRepositorio;