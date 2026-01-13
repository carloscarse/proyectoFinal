const { conexion } = require('../config/dataBase');

const PermisoRepository = {
  async tienePermiso(rol, recurso, accion) {
    console.log('📝 Ejecutando SQL permiso:', rol, recurso, accion);
    const [rows] = await conexion.query(
      'SELECT permitido FROM permiso WHERE rol=? AND recurso=? AND accion=?',
      [rol, recurso, accion]
    );
    console.log('📊 Filas devueltas:', rows);
    return rows[0]?.permitido === 1;
  }
};

module.exports = PermisoRepository;