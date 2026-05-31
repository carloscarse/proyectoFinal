// proyecto/backEnd/repositories/rubro.js

const { conexion } = require('../config/dataBase');

const RubroRepositorio = {
  async obtenerRubros() {
    const [rows] = await conexion.query('SELECT * FROM rubro WHERE borrado = FALSE');
    return rows.map(r => ({
      ...r,
      label: [r.rubro, r.descripcion]
        .filter(v => v && v.trim() !== '')
        .join(' - ')
    }));
  },

  async obtenerRubroPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM rubro WHERE id = ? AND borrado = FALSE', [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    return {
      ...r,
      label: [r.rubro, r.descripcion]
        .filter(v => v && v.trim() !== '')
        .join(' - ')
    };
  },

  async agregarRubro(rubro) {
    const { rubro: nombreRubro, descripcion } = rubro;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      INSERT INTO rubro (rubro, descripcion, borrado)
      VALUES (?, ?, FALSE)
    `;
    const values = [
      normalize(nombreRubro),
      normalize(descripcion)
    ];

    const [result] = await conexion.query(query, values);
    return { id: result.insertId, borrado: false, ...rubro };
  },

  async actualizarRubro(id, rubro) {
    const { rubro: nombreRubro, descripcion } = rubro;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      UPDATE rubro
      SET rubro=?, descripcion=?
      WHERE id=? AND borrado = FALSE
    `;
    const values = [
      normalize(nombreRubro),
      normalize(descripcion),
      id
    ];

    await conexion.query(query, values);
    return { id, borrado: false, ...rubro };
  },

  // 🔹 Borrado lógico (default)
  async eliminarRubro(id) {
    await conexion.query(`
      UPDATE rubro
      SET borrado = TRUE
      WHERE id=?
    `, [id]);
    return { message: `Rubro con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarRubroFisico(id) {
    await conexion.query('DELETE FROM rubro WHERE id=?', [id]);
    return { message: `Rubro con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerRubrosEliminados() {
    const [rows] = await conexion.query('SELECT * FROM rubro WHERE borrado = TRUE');
    return rows;
  },

  async obtenerRubroEliminadoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM rubro WHERE borrado = TRUE AND id = ?', [id]);
    return rows[0] || null;
  }
};

module.exports = RubroRepositorio;