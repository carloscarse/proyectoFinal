const { conexion } = require('../config/dataBase');

const DireccionRepositorio = {
  async obtenerDireccion() {
    const [rows] = await conexion.query('SELECT * FROM direccion WHERE borrado = FALSE');
    return rows.map(d => ({
      ...d,
      label: [d.calle, d.numero, d.ciudad, d.provincia, d.pais]
        .filter(v => v && v.toString().trim() !== '')
        .join(', ')
    }));
  },

  async obtenerDireccionPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM direccion WHERE id = ? AND borrado = FALSE', [id]);
    if (!rows[0]) return null;
    const d = rows[0];
    return {
      ...d,
      label: [d.calle, d.numero, d.ciudad, d.provincia, d.pais]
        .filter(v => v && v.toString().trim() !== '')
        .join(', ')
    };
  },

  async agregarDireccion(direccion) {
    const {
      persona,
      calle,
      numero,
      manzana,
      lote,
      edificio,
      piso,
      departamento,
      barrio,
      localidad,
      ciudad,
      provincia,
      pais,
      codigoPostal
    } = direccion;

    const normalize = (val) => (val === undefined || val === '' ? null : val);

    if (!persona) {
      throw new Error("El campo 'persona' es obligatorio en la tabla dirección");
    }

    const query = `
      INSERT INTO direccion (
        persona, calle, numero, manzana, lote, edificio, piso, departamento,
        barrio, localidad, ciudad, provincia, pais, codigoPostal, borrado
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE)
    `;

    const values = [
      persona,
      normalize(calle),
      normalize(numero),
      normalize(manzana),
      normalize(lote),
      normalize(edificio),
      normalize(piso),
      normalize(departamento),
      normalize(barrio),
      normalize(localidad),
      normalize(ciudad),
      normalize(provincia),
      normalize(pais),
      normalize(codigoPostal)
    ];

    const [result] = await conexion.query(query, values);
    return { id: result.insertId, borrado: 0, ...direccion }; // 👈 devolvemos borrado=0 en el objeto
  },

  async actualizarDireccion(id, direccion) {
    const {
      persona,
      calle,
      numero,
      manzana,
      lote,
      edificio,
      piso,
      departamento,
      barrio,
      localidad,
      ciudad,
      provincia,
      pais,
      codigoPostal
    } = direccion;

    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const query = `
      UPDATE direccion
      SET persona=?, calle=?, numero=?, manzana=?, lote=?, edificio=?, piso=?, departamento=?,
          barrio=?, localidad=?, ciudad=?, provincia=?, pais=?, codigoPostal=?
      WHERE id=? AND borrado = FALSE
    `;

    const values = [
      persona,
      normalize(calle),
      normalize(numero),
      normalize(manzana),
      normalize(lote),
      normalize(edificio),
      normalize(piso),
      normalize(departamento),
      normalize(barrio),
      normalize(localidad),
      normalize(ciudad),
      normalize(provincia),
      normalize(pais),
      normalize(codigoPostal),
      id
    ];

    await conexion.query(query, values);
    return { id, ...direccion };
  },

  // 🔹 Borrado lógico (default)
  async eliminarDireccion(id) {
    await conexion.query(`
      UPDATE direccion
      SET borrado = TRUE
      WHERE id=?
    `, [id]);
    return { message: `Dirección con id ${id} marcada como borrada (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarDireccionFisico(id) {
    await conexion.query('DELETE FROM direccion WHERE id=?', [id]);
    return { message: `Dirección con id ${id} eliminada físicamente (borrado definitivo)` };
  },

  async obtenerDireccionesPorPersonaId(personaId) {
    const [rows] = await conexion.query('SELECT * FROM direccion WHERE persona = ? AND borrado = FALSE', [personaId]);
    return rows.map(d => ({
      ...d,
      label: [d.calle, d.numero, d.ciudad, d.provincia, d.pais]
        .filter(v => v && v.toString().trim() !== '')
        .join(', ')
    }));
  },

  async obtenerDireccionesEliminadas() {
    const [rows] = await conexion.query('SELECT * FROM direccion WHERE borrado = TRUE');
    return rows;
  },

  async obtenerDireccionEliminadaPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM direccion WHERE id = ? AND borrado = TRUE', [id]);
    return rows[0] || null;
  }
};

module.exports = DireccionRepositorio;