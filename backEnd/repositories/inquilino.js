// proyecto/backEnd/repositories/inquilino.js

const { conexion } = require('../config/dataBase');

const InquilinoRepositorio = {
  async obtenerInquilinos() {
    const [rows] = await conexion.query(`
      SELECT i.*, 
             p.nombre, p.segundoNombre, p.apellido, p.segundoApellido
      FROM inquilino i
      JOIN persona p ON i.persona = p.id
      WHERE i.borrado = FALSE
    `);
    return rows.map(i => ({
      ...i,
      label: [i.nombre, i.segundoNombre, i.apellido, i.segundoApellido]
        .filter(v => v && v.trim() !== '')
        .join(' ')
    }));
  },

  async obtenerInquilinoPorId(id) {
    const [rows] = await conexion.query(`
      SELECT i.*, 
             p.nombre, p.segundoNombre, p.apellido, p.segundoApellido
      FROM inquilino i
      JOIN persona p ON i.persona = p.id
      WHERE i.id = ? AND i.borrado = FALSE
    `, [id]);

    if (!rows[0]) return null;
    const i = rows[0];
    return {
      ...i,
      label: [i.nombre, i.segundoNombre, i.apellido, i.segundoApellido]
        .filter(v => v && v.trim() !== '')
        .join(' ')
    };
  },

  async agregarInquilino(inquilino) {
    const { persona, alta } = inquilino;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      INSERT INTO inquilino (persona, alta, borrado)
      VALUES (?, ?, FALSE)
    `;
    const values = [ normalize(persona), normalize(alta) ];

    const [result] = await conexion.query(query, values);
    return { id: result.insertId, borrado: false, ...inquilino };
  },

  async actualizarInquilino(id, inquilino) {
    const { persona, alta } = inquilino;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      UPDATE inquilino 
      SET persona=?, alta=? 
      WHERE id=? AND borrado = FALSE
    `;
    const values = [ normalize(persona), normalize(alta), id ];

    await conexion.query(query, values);
    return { id, borrado: false, ...inquilino };
  },

  // 🔹 Borrado lógico
  async eliminarInquilino(id) {
    await conexion.query(`UPDATE inquilino SET borrado = TRUE WHERE id=?`, [id]);
    return { message: `Inquilino con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico
  async eliminarInquilinoFisico(id) {
    await conexion.query('DELETE FROM inquilino WHERE id=?', [id]);
    return { message: `Inquilino con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerInquilinosEliminados() {
    const [rows] = await conexion.query('SELECT * FROM inquilino WHERE borrado = TRUE');
    return rows;
  },

  async obtenerInquilinoEliminadoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM inquilino WHERE borrado = TRUE AND id = ?', [id]);
    return rows[0] || null;
  }
};

module.exports = InquilinoRepositorio;