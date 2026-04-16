// proyecto/backEnd/repositories/usuario.js
const { conexion } = require('../config/dataBase');

const UsuarioRepositorio = {
  async obtenerUsuario() {
    const [rows] = await conexion.query('SELECT * FROM usuario WHERE borrado = FALSE');
    return rows.map(u => ({ ...u, label: u.usuario }));
  },

  async obtenerUsuarioPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM usuario WHERE id = ? AND borrado = FALSE', [id]);
    if (!rows[0]) return null;
    const u = rows[0];
    return { ...u, label: u.usuario };
  },

  async obtenerUsuarioPorNombre(nombreUsuario) {
    const [rows] = await conexion.query(
      'SELECT id, usuario, clave, rol, persona FROM usuario WHERE usuario = ? AND borrado = FALSE',
      [nombreUsuario]
    );
    if (!rows[0]) return null;
    const u = rows[0];
    return {
      id: u.id,
      usuario: u.usuario,
      clave: u.clave,
      rol: u.rol,
      persona: u.persona
    };
  },

  async agregarUsuario({ usuario, clave, rol }) {
    const query = 'INSERT INTO usuario (usuario, clave, rol) VALUES (?, ?, ?)';
    const values = [usuario, clave, rol];
    const [result] = await conexion.query(query, values);
    return { id: result.insertId, usuario, clave, rol };
  },

  async actualizarUsuario(id, { usuario, clave, rol }) {
    const query = 'UPDATE usuario SET usuario=?, clave=?, rol=? WHERE id=? AND borrado = FALSE';
    const values = [usuario, clave, rol, id];
    await conexion.query(query, values);
    return { id, usuario, clave, rol };
  },

  // 🔹 Borrado lógico (default)
  async eliminarUsuario(id) {
    await conexion.query('UPDATE usuario SET borrado = TRUE WHERE id=?', [id]);
    return { message: `Usuario con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarUsuarioFisico(id) {
    await conexion.query('DELETE FROM usuario WHERE id=?', [id]);
    return { message: `Usuario con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerUsuariosEliminados() {
    const [rows] = await conexion.query('SELECT * FROM usuario WHERE borrado = TRUE');
    return rows;
  },

  async obtenerUsuarioEliminadoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM usuario WHERE id=? AND borrado = TRUE', [id]);
    return rows[0] || null;
  }
};

module.exports = UsuarioRepositorio;