// proyecto/backEnd/repositories/telefono.js

const { conexion } = require('../config/dataBase');

const TelefonoRepositorio = {
  async obtenerTelefono() {
    const [rows] = await conexion.query('SELECT * FROM telefono WHERE borrado = FALSE');
    return rows.map(t => ({
      ...t,
      label: [t.pais, t.cArea, t.numero]
        .filter(v => v && v.toString().trim() !== '')
        .join(' ')
    }));
  },

  async obtenerTelefonoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM telefono WHERE id = ? AND borrado = FALSE', [id]);
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
      INSERT INTO telefono (persona, pais, cArea, numero, borrado)
      VALUES (?, ?, ?, ?, FALSE)
    `;
    const values = [
      persona,
      normalize(pais),
      normalize(cArea),
      normalize(numero)
    ];

    const [result] = await conexion.query(query, values);
    return { id: result.insertId, borrado: 0, ...telefono }; // 👈 devolvemos borrado=0 en el objeto
  },

  async actualizarTelefono(id, telefono) {
    const { persona, pais, cArea, numero } = telefono;
    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      UPDATE telefono
      SET persona=?, pais=?, cArea=?, numero=?
      WHERE id=? AND borrado = FALSE
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

  // 🔹 Borrado lógico (default)
  async eliminarTelefono(id) {
    await conexion.query('UPDATE telefono SET borrado = TRUE WHERE id=?', [id]);
    return { message: `Teléfono con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarTelefonoFisico(id) {
    await conexion.query('DELETE FROM telefono WHERE id=?', [id]);
    return { message: `Teléfono con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerTelefonosPorPersonaId(personaId) {
    const [rows] = await conexion.query('SELECT * FROM telefono WHERE persona = ? AND borrado = FALSE', [personaId]);
    return rows.map(t => ({
      ...t,
      label: [t.pais, t.cArea, t.numero]
        .filter(v => v && v.toString().trim() !== '')
        .join(' ')
    }));
  },

  async obtenerTelefonosEliminados() {
    const [rows] = await conexion.query('SELECT * FROM telefono WHERE borrado = TRUE');
    return rows;
  },

  async obtenerTelefonoEliminadoPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM telefono WHERE id = ? AND borrado = TRUE', [id]);
    return rows[0] || null;
  }
};

module.exports = TelefonoRepositorio;