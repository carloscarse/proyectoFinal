// proyecto/backEnd/services/logMovimiento.js

const { conexion } = require('../config/dataBase');
const UsuarioServicio = require('./usuario'); // 👈 importamos el servicio de usuario

const LogMovimientoServicio = {
  async agregarLogMovimiento(datos) {
    try {
      const usuarioData = await UsuarioServicio.obtenerUsuarioPorId(datos.usuario);
      const labelUsuario = usuarioData?.label || usuarioData?.usuario || "desconocido";

      const detalleFinal = `El usuario ${labelUsuario} con id ${datos.usuario}, ${datos.detalle}`;

      const [result] = await conexion.query(
        `INSERT INTO logmovimiento 
         (usuario, accion, entidad, campo, previo, nuevo, ip, detalle) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          datos.usuario,
          datos.accion,
          datos.entidad,
          datos.campo,
          datos.previo,
          datos.nuevo,
          datos.ip,
          detalleFinal
        ]
      );

      return result.insertId;
    } catch (err) {
      console.error("❌ Error en agregarLogMovimiento:", err.message);
      throw err;
    }
  },

  async obtenerLogMovimiento() {
    const [rows] = await conexion.query(
      "SELECT * FROM logmovimiento WHERE borrado = FALSE ORDER BY fecha DESC"
    );
    return rows;
  },

  async obtenerLogMovimientoPorId(id) {
    const [rows] = await conexion.query(
      "SELECT * FROM logmovimiento WHERE id=? AND borrado = FALSE",
      [id]
    );
    return rows[0] || null;
  },

  async actualizarLogMovimiento(id, datos) {
    await conexion.query(
      `UPDATE logmovimiento 
       SET accion=?, entidad=?, campo=?, previo=?, nuevo=?, detalle=? 
       WHERE id=? AND borrado = FALSE`,
      [
        datos.accion,
        datos.entidad,
        datos.campo,
        datos.previo,
        datos.nuevo,
        datos.detalle,
        id
      ]
    );
    return { id, ...datos };
  },

  // 🔹 Borrado lógico
  async eliminarLogMovimiento(id) {
    await conexion.query("UPDATE logmovimiento SET borrado = TRUE WHERE id=?", [id]);
    return { message: `LogMovimiento con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarLogMovimientoFisico(id) {
    await conexion.query("DELETE FROM logmovimiento WHERE id=?", [id]);
    return { message: `LogMovimiento con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerLogsEliminados() {
    const [rows] = await conexion.query(
      "SELECT * FROM logmovimiento WHERE borrado = TRUE ORDER BY fecha DESC"
    );
    return rows;
  },

  async obtenerLogEliminadoPorId(id) {
    const [rows] = await conexion.query(
      "SELECT * FROM logmovimiento WHERE id=? AND borrado = TRUE",
      [id]
    );
    return rows[0] || null;
  }
};

module.exports = LogMovimientoServicio;