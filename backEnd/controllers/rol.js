const { conexion } = require('../config/dataBase.js');

// Crear un nuevo rol (con validación defensiva)
const crearRol = async (req, res) => {
  console.log('🟡 [crearRol] Recibido:', req.body);

  const {
    rol = '',
    descripcion = '',
    nota = ''
  } = req.body;

  // Validación: al menos uno de los campos principales no debe ser vacío
  if (!rol && !descripcion && !nota) {
    return res.status(400).json({
      error: 'Debe ingresar al menos un nombre de rol, descripción o nota'
    });
  }

  const sql = `
    INSERT INTO rol (rol, descripcion, nota)
    VALUES (?, ?, ?)
  `;
  const valores = [rol, descripcion, nota];

  try {
    console.log('🟡 [crearRol] Ejecutando SQL:', sql);
    console.log('🟡 [crearRol] Valores:', valores);

    const [results] = await conexion.query(sql, valores);

    console.log('🟢 [crearRol] Rol creado con ID:', results.insertId);

    const partes = [rol, descripcion, nota];
    const label = partes.filter(v => v && v !== 'null').join(' - ');

    res.json({
      message: 'Rol creado correctamente',
      id: results.insertId,
      rol,
      descripcion,
      nota,
      label
    });
  } catch (error) {
    console.error('🔴 [crearRol] Error al insertar:', error.message);
    res.status(500).json({
      error: 'Error al crear el rol',
      detalle: error.message
    });
  }
};

// Mostrar todos los roles
const mostrarRoles = async (req, res) => {
  try {
    console.log('🟡 [mostrarRoles] Ejecutando SELECT * FROM rol');
    const [results] = await conexion.query('SELECT * FROM rol');
    console.log('🟢 [mostrarRoles] Roles obtenidos:', results);

    const rolesConLabel = results.map(r => {
      const partes = [r.rol, r.descripcion, r.nota];
      const label = partes.filter(v => v && v !== 'null').join(' - ');
      return { ...r, label };
    });

    res.json(rolesConLabel);
  } catch (error) {
    console.error('🔴 [mostrarRoles] Error SQL:', error.message);
    res.status(500).json({ error: 'Error al obtener los roles', detalle: error.message });
  }
};

// Mostrar un rol por ID
const mostrarRol = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('SELECT * FROM rol WHERE id = ?', [id]);
    if (results.length === 0) {
      console.warn('⚠️ Rol no encontrado:', id);
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    console.log('🟢 Rol encontrado:', results[0]);

    const r = results[0];
    const partes = [r.rol, r.descripcion, r.nota];
    const label = partes.filter(v => v && v !== 'null').join(' - ');

    res.json({ ...r, label });
  } catch (error) {
    console.error('🔴 Error al obtener rol:', error.message);
    res.status(500).json({ error: 'Error al obtener el rol', detalle: error.message });
  }
};

// Editar un rol
const editarRol = async (req, res) => {
  const { id } = req.params;
  const {
    rol,
    descripcion,
    nota
  } = req.body;

  if (!rol && !descripcion && !nota) {
    return res.status(400).json({
      error: 'Debe ingresar al menos un nombre de rol, descripción o nota'
    });
  }

  const sql = `
    UPDATE rol
    SET rol = ?, descripcion = ?, nota = ?
    WHERE id = ?
  `;
  const valores = [rol, descripcion, nota, id];

  try {
    const [results] = await conexion.query(sql, valores);
    if (results.affectedRows === 0) {
      console.warn('⚠️ Rol no encontrado para editar:', id);
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    console.log('🟢 Rol actualizado:', id);

    const partes = [rol, descripcion, nota];
    const label = partes.filter(v => v && v !== 'null').join(' - ');

    res.json({ id, rol, descripcion, nota, label });
  } catch (error) {
    console.error('🔴 Error al editar rol:', error.message);
    res.status(500).json({ error: 'Error al editar el rol', detalle: error.message });
  }
};

// Eliminar un rol
const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('DELETE FROM rol WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      console.warn('⚠️ Rol no encontrado para eliminar:', id);
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    console.log('🟢 Rol eliminado:', id);
    res.status(204).send();
  } catch (error) {
    console.error('🔴 Error al eliminar rol:', error.message);
    res.status(500).json({ error: 'Error al eliminar el rol', detalle: error.message });
  }
};

module.exports = {
  crearRol,
  mostrarRoles,
  mostrarRol,
  editarRol,
  eliminarRol
};