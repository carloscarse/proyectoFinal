// proyecto/backEnd/repositories/direccion.js

const { conexion } = require('../config/dataBase');

const DireccionRepositorio = {
  async obtenerDireccion() {
    const [rows] = await conexion.query('SELECT * FROM direccion');
    return rows.map(d => ({
      ...d,
      label: [d.calle, d.numero, d.ciudad, d.provincia, d.pais]
        .filter(v => v && v.toString().trim() !== '')
        .join(', ')
    }));
  },

  async obtenerDireccionPorId(id) {
    const [rows] = await conexion.query('SELECT * FROM direccion WHERE id = ?', [id]);
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
        barrio, localidad, ciudad, provincia, pais, codigoPostal
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    return { id: result.insertId, ...direccion };
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
      WHERE id=?
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

  async eliminarDireccion(id) {
    await conexion.query('DELETE FROM direccion WHERE id=?', [id]);
    return { message: `Dirección con id ${id} eliminada` };
  },

  async obtenerDireccionesPorPersonaId(personaId) {
    const [rows] = await conexion.query('SELECT * FROM direccion WHERE persona = ?', [personaId]);
    return rows.map(d => ({
      ...d,
      label: [d.calle, d.numero, d.ciudad, d.provincia, d.pais]
        .filter(v => v && v.toString().trim() !== '')
        .join(', ')
    }));
  }
};

module.exports = DireccionRepositorio;