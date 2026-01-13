// proyecto/backend/src/repositories/usuario.js
const { conexion } = require('../config/dataBase');

const UsuarioRepository = {
  // Obtener todos los usuarios
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM usuario');
    return rows.map(u => ({
      ...u,
      label: u.usuario // ✅ el label del usuario es el campo usuario
    }));
  },

  // Obtener un usuario por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM usuario WHERE id = ?', [id]);
    if (!rows[0]) return null;

    const u = rows[0];
    return {
      ...u,
      label: u.usuario
    };
  },

  // Obtener un usuario por nombre de usuario (para login)
  async getByUsuario(nombreUsuario) {
    const [rows] = await conexion.query(
      'SELECT id, usuario, clave, rol, persona FROM usuario WHERE usuario = ?',
      [nombreUsuario]
    );
    if (!rows[0]) return null;

    const u = rows[0];
    return {
      id: u.id,
      usuario: u.usuario,
      clave: u.clave,
      rol: u.rol,        // 👈 aseguramos que el rol numérico esté presente
      persona: u.persona // 👈 si existe relación con persona
    };
  },

  // Crear un nuevo usuario
  async create(usuario) {
    const { usuario: nombreUsuario, clave, rol } = usuario;

    console.log('🧾 Ejecutando INSERT en usuario:', { nombreUsuario, rol });

    const query = 'INSERT INTO usuario (usuario, clave, rol) VALUES (?, ?, ?)';
    const values = [nombreUsuario, clave, rol];

    const [result] = await conexion.query(query, values);

    console.log('✅ Usuario insertado con ID:', result.insertId);

    return { id: result.insertId, ...usuario };
  },

  // Actualizar un usuario
  async update(id, usuario) {
    const { usuario: nombreUsuario, clave, rol } = usuario;

    console.log('✏️ Ejecutando UPDATE en usuario:', { id, nombreUsuario, rol });

    const query = 'UPDATE usuario SET usuario=?, clave=?, rol=? WHERE id=?';
    const values = [nombreUsuario, clave, rol, id];

    await conexion.query(query, values);

    return { id, ...usuario };
  },

  // Eliminar un usuario
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en usuario con ID:', id);
    await conexion.query('DELETE FROM usuario WHERE id=?', [id]);
    return { message: `Usuario con id ${id} eliminado` };
  }
};

module.exports = UsuarioRepository;