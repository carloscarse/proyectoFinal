// proyecto/backEnd/repositories/espacio.js
const { conexion } = require('../config/dataBase');

const EspacioRepositorio = {
  async obtenerEspacios() {
    const [rows] = await conexion.query(`
      SELECT e.*, 
             i.id AS inquilinoId, r.id AS rubroId
      FROM espacio e
      LEFT JOIN inquilino i ON e.inquilino = i.id
      LEFT JOIN rubro r ON e.rubro = r.id
      WHERE e.borrado = FALSE
    `);
    return rows.map(e => ({
      ...e,
      label: [e.nombre, e.tipo, e.estado]
        .filter(v => v && v.trim() !== '')
        .join(' - ')
    }));
  },

  async obtenerEspacioPorId(id) {
    const [rows] = await conexion.query(`
      SELECT e.*, 
             i.id AS inquilinoId, r.id AS rubroId
      FROM espacio e
      LEFT JOIN inquilino i ON e.inquilino = i.id
      LEFT JOIN rubro r ON e.rubro = r.id
      WHERE e.id = ? AND e.borrado = FALSE
    `, [id]);

    if (!rows[0]) return null;
    const e = rows[0];
    return {
      ...e,
      label: [e.nombre, e.tipo, e.estado]
        .filter(v => v && v.trim() !== '')
        .join(' - ')
    };
  },

  async agregarEspacio(espacio) {
    const { nombre, estado, ancho, largo, tipo, inquilino, precio, rubro, recargoUbicacion, descripcion } = espacio;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      INSERT INTO espacio (nombre, estado, ancho, largo, tipo, inquilino, precio, rubro, recargoUbicacion, descripcion, borrado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE)
    `;
    const values = [
      normalize(nombre), normalize(estado), normalize(ancho), normalize(largo),
      normalize(tipo), normalize(inquilino), normalize(precio), normalize(rubro),
      normalize(recargoUbicacion), normalize(descripcion)
    ];

    const [result] = await conexion.query(query, values);
    return { id: result.insertId, borrado: false, ...espacio };
  },

  async actualizarEspacio(id, espacio) {
    const { nombre, estado, ancho, largo, tipo, inquilino, precio, rubro, recargoUbicacion, descripcion } = espacio;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      UPDATE espacio 
      SET nombre=?, estado=?, ancho=?, largo=?, tipo=?, inquilino=?, precio=?, rubro=?, recargoUbicacion=?, descripcion=? 
      WHERE id=? AND borrado = FALSE
    `;
    const values = [
      normalize(nombre), normalize(estado), normalize(ancho), normalize(largo),
      normalize(tipo), normalize(inquilino), normalize(precio), normalize(rubro),
      normalize(recargoUbicacion), normalize(descripcion), id
    ];

    await conexion.query(query, values);
    return { id, borrado: false, ...espacio };
  },

  // 🔹 Borrado lógico
  async eliminarEspacio(id) {
    await conexion.query(`UPDATE espacio SET borrado = TRUE WHERE id=?`, [id]);
    return { message: `Espacio con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico
  async eliminarEspacioFisico(id) {
    await conexion.query('DELETE FROM espacio WHERE id=?', [id]);
    return { message: `Espacio con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerEspaciosEliminados() {
    const [rows] = await conexion.query('SELECT * FROM espacio WHERE borrado = TRUE');
    return rows;
  },

  async obtenerEspacioEliminadoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM espacio WHERE borrado = TRUE AND id = ?', [id]);
    return rows[0] || null;
  }
};

module.exports = EspacioRepositorio;