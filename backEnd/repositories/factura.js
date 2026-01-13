const { conexion } = require('../config/dataBase');

const FacturaRepository = {
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM factura');
    return rows.map(r => ({ ...r, label: r.numeroFactura }));
  },

  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM factura WHERE id=?', [id]);
    const r = rows[0];
    return r ? { ...r, label: r.numeroFactura } : null;
  },

  async create(data) {
    const [result] = await conexion.query('INSERT INTO factura SET ?', [data]);
    return { id: result.insertId, ...data, label: data.numeroFactura };
  },

  async update(id, data) {
    await conexion.query('UPDATE factura SET ? WHERE id=?', [data, id]);
    return { id, ...data, label: data.numeroFactura };
  },

  async delete(id) {
    await conexion.query('DELETE FROM factura WHERE id=?', [id]);
    return { mensaje: `Factura eliminada` };
  }
};

module.exports = FacturaRepository;