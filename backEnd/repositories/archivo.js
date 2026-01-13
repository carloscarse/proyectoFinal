const { conexion } = require('../config/dataBase');

const ArchivoRepository = {
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM archivo');
    return rows.map(r => ({ ...r, label: r.nombreArchivo }));
  },

  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM archivo WHERE id=?', [id]);
    const r = rows[0];
    return r ? { ...r, label: r.nombreArchivo } : null;
  },

  async create(data) {
    const [result] = await conexion.query('INSERT INTO archivo SET ?', [data]);
    return { id: result.insertId, ...data, label: data.nombreArchivo };
  },

  async update(id, data) {
    await conexion.query('UPDATE archivo SET ? WHERE id=?', [data, id]);
    return { id, ...data, label: data.nombreArchivo };
  },

  async delete(id) {
    await conexion.query('DELETE FROM archivo WHERE id=?', [id]);
    return { mensaje: `Archivo eliminado` };
  }
};

module.exports = ArchivoRepository;