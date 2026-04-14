// proyecto/backEnd/repositories/telefono.js

const { conexion } = require('../config/dataBase');

const TelefonoRepositorio = {
  async obtenerTelefono() {
    const [rows] = await conexion.query('SELECT * FROM telefono');
    return rows.map(t => ({
      ...t,
      label: [t.pais, t.cArea, t.numero]
        .filter(v => v && v.toString().trim() !== '')
        .join(' ')
    }));
  },

  async obtenerTelefonoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM telefono WHERE id = ?', [id]);
    if (!rows[0]) return null;
    const t = rows[0];
    return {
      ...t,
      label: [t.pais, t.cArea, t.numero]
        .filter(v => v && v.toString().trim() !== '')
        .join(' ')
    };
  },

  async agregarTelefono(telefono) {
    const { persona, pais, cArea, numero } = telefono;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    if (!persona) {
      throw new Error("El campo 'persona' es obligatorio en la tabla teléfono");
    }

    const query = `
      INSERT INTO telefono (persona, pais, cArea, numero)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      persona,
      normalize(pais),
      normalize(cArea),
      normalize(numero)
    ];

    const [result] = await conexion.query(query, values);
    return { id: result.insertId, ...telefono };
  },

  async actualizarTelefono(id, telefono) {
    const { persona, pais, cArea, numero } = telefono;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      UPDATE telefono
      SET persona=?, pais=?, cArea=?, numero=?
      WHERE id=?
    `;
    const values = [
      persona,
      normalize(pais),
      normalize(cArea),
      normalize(numero),
      id
    ];

    await conexion.query(query, values);
    return { id, ...telefono };
  },

  async eliminarTelefono(id) {
    await conexion.query('DELETE FROM telefono WHERE id=?', [id]);
    return { message: `Teléfono con id ${id} eliminado` };
  },

  async obtenerTelefonosPorPersonaId(personaId) {
    const [rows] = await conexion.query('SELECT * FROM telefono WHERE persona = ?', [personaId]);
    return rows.map(t => ({
      ...t,
      label: [t.pais, t.cArea, t.numero]
        .filter(v => v && v.toString().trim() !== '')
        .join(' ')
    }));
  }
};

module.exports = TelefonoRepositorio;