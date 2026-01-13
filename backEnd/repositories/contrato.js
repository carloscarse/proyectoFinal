const { conexion } = require('../config/dataBase');

const ContratoRepository = {
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM contrato');
    return rows.map(r => ({ ...r, label: r.numeroContrato }));
  },

  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM contrato WHERE id=?', [id]);
    const r = rows[0];
    return r ? { ...r, label: r.numeroContrato } : null;
  },

  async create(data) {
    const [result] = await conexion.query('INSERT INTO contrato SET ?', [data]);
    return { id: result.insertId, ...data, label: data.numeroContrato };
  },

  async update(id, data) {
    await conexion.query('UPDATE contrato SET ? WHERE id=?', [data, id]);
    return { id, ...data, label: data.numeroContrato };
  },

  async delete(id) {
    await conexion.query('DELETE FROM contrato WHERE id=?', [id]);
    return { mensaje: `Contrato eliminado` };
  }
};

module.exports = ContratoRepository;