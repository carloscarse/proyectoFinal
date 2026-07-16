// proyecto/backEnd/repositories/documentacion.js

const { conexion } = require('../config/dataBase');

const DocumentacionRepositorio = {
  async obtenerDocumentacion() {
    const [rows] = await conexion.query('SELECT * FROM documentacion WHERE borrado = FALSE');
    return rows.map(d => ({
     ...d,
      label: [d.documento, d.descripcion]
       .filter(v => v && v.trim()!== '')
       .join(' - ')
    }));
  },

  async obtenerDocumentacionPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM documentacion WHERE id =? AND borrado = FALSE', [id]);
    if (!rows[0]) return null;
    const d = rows[0];
    return {
     ...d,
      label: [d.documento, d.descripcion]
       .filter(v => v && v.trim()!== '')
       .join(' - ')
    };
  },

  async agregarDocumentacion(documentacion) {
    const { documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion } = documentacion;
    const normalize = (val) => (val === undefined || val === ''? null : val);

    const query = `
      INSERT INTO documentacion (documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion, borrado)
      VALUES (?,?,?,?,?,?, FALSE)
    `;
    const values = [
      normalize(documento),
      normalize(inquilino),
      normalize(descripcion),
      normalize(emision),
      normalize(vencimiento),
      normalize(fechaPresentacion)
    ];

    const [result] = await conexion.query(query, values);
    return { id: result.insertId, borrado: 0,...documentacion };
  },

  async actualizarDocumentacion(id, documentacion) {
    const { documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion } = documentacion;
    const normalize = (val) => (val === undefined || val === ''? null : val);

    const query = `
      UPDATE documentacion
      SET documento=?, inquilino=?, descripcion=?, emision=?, vencimiento=?, fechaPresentacion=?
      WHERE id=? AND borrado = FALSE
    `;
    const values = [
      normalize(documento),
      normalize(inquilino),
      normalize(descripcion),
      normalize(emision),
      normalize(vencimiento),
      normalize(fechaPresentacion),
      id
    ];

    await conexion.query(query, values);
    return { id,...documentacion };
  },

  // 🔹 Borrado lógico (default)
  async eliminarDocumentacion(id) {
    await conexion.query(`
      UPDATE documentacion
      SET borrado = TRUE
      WHERE id=?
    `, [id]);
    return { message: `Documentación con id ${id} marcada como borrada (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarDocumentacionFisico(id) {
    await conexion.query('DELETE FROM documentacion WHERE id=?', [id]);
    return { message: `Documentación con id ${id} eliminada físicamente (borrado definitivo)` };
  },

  async obtenerDocumentacionesEliminadas() {
    const [rows] = await conexion.query('SELECT * FROM documentacion WHERE borrado = TRUE');
    return rows;
  },

  async obtenerDocumentacionEliminadaPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM documentacion WHERE borrado = TRUE AND id =?', [id]);
    return rows[0] || null;
  }
};

module.exports = DocumentacionRepositorio;