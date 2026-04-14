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
    const sql = `SELECT * FROM logmovimiento ORDER BY fecha DESC`;
    const [rows] = await conexion.query(sql);
    return rows;
  },

  async actualizarLogMovimiento(id, { usuario, accion, entidad, campo, previo, nuevo, ip, detalle }) {
    const sql = `
      UPDATE logmovimiento
      SET usuario=?, accion=?, entidad=?, campo=?, previo=?, nuevo=?, ip=?, detalle=?
      WHERE id=?
    `;
    const params = [usuario, accion, entidad, campo, previo, nuevo, ip, detalle, id];
    const [result] = await conexion.query(sql, params);
    return result.affectedRows;
  },

  async eliminarLogMovimiento(id) {
    const sql = `DELETE FROM logmovimiento WHERE id=?`;
    const [result] = await conexion.query(sql, [id]);
    return result.affectedRows;
  }
};

module.exports = LogMovimientoRepositorio;