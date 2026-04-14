// proyecto/backEnd/services/logMovimiento.js

const { conexion } = require('../config/dataBase');
const UsuarioServicio = require('./usuario'); // 👈 importamos el servicio/controlador de usuario

const LogMovimientoServicio = {
  async agregarLogMovimiento(datos) {
    try {
      // Recuperar datos del usuario usando el servicio de usuario
      const usuarioData = await UsuarioServicio.obtenerUsuarioPorId(datos.usuario);
      const labelUsuario = usuarioData?.label || usuarioData?.usuario || "desconocido";

      // Construir detalle final (solo una vez)
      const detalleFinal = `El usuario ${labelUsuario} con id ${datos.usuario}, ${datos.detalle}`;

      // Insertar registro en logmovimiento
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
      "SELECT * FROM logmovimiento ORDER BY fecha DESC"
    );
    return rows;
  },

  async actualizarLogMovimiento(id, datos) {
    await conexion.query(
      `UPDATE logmovimiento 
       SET accion=?, entidad=?, campo=?, previo=?, nuevo=?, detalle=? 
       WHERE id=?`,
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
  },

  async eliminarLogMovimiento(id) {
    await conexion.query("DELETE FROM logmovimiento WHERE id=?", [id]);
  }
};

module.exports = LogMovimientoServicio;