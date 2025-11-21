import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import FormularioPersona from './FormularioPersona';
import FormularioRol from './FormularioRol';
import './FormularioUsuario.css';

function FormularioUsuario({ onClose }) {
  const initialForm = {
    usuario: '',
    clave: '',
    persona: '',
    rol: '',
    estado: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [personas, setPersonas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [showRolModal, setShowRolModal] = useState(false);

  const fetchPersonas = async () => {
    try {
      const res = await api.get('/persona');
      setPersonas(res.data);
      console.log('✅ Personas cargadas:', res.data);
    } catch (err) {
      console.error('❌ Error al obtener personas:', err);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await api.get('/rol');
      setRoles(res.data);
      console.log('✅ Roles cargados:', res.data);
    } catch (err) {
      console.error('❌ Error al obtener roles:', err);
    }
  };

  useEffect(() => {
    setFormData(initialForm);
    fetchPersonas();
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'persona' && value === 'nuevo') {
      setShowPersonaModal(true);
      return;
    }

    if (name === 'rol' && value === 'nuevo') {
      setShowRolModal(true);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      const res = await api.post('/usuario', {
        ...formData,
        creacion: now,
        ultimoAcceso: null
      });

      setMensaje('✅ Usuario registrado correctamente');
      setError('');
      console.log('Usuario creado:', res.data);

      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1500);
    } catch (err) {
      setError('❌ Error al registrar usuario');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="usuarios-form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Nuevo Usuario</h3>

        <div className="form-scroll">
          <label>Usuario</label>
          <input name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Usuario" />

          <label>Clave</label>
          <input name="clave" type="password" value={formData.clave} onChange={handleChange} placeholder="Clave" />

          <label>Datos Personales</label>
          <select name="persona" value={formData.persona} onChange={handleChange}>
            <option value="">Seleccionar persona</option>
            <option value="nuevo">➕ Nuevo</option>
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.segundoNombre} {p.apellido} {p.segundoApellido}
              </option>
            ))}
          </select>

          <label>Rol</label>
          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="">Seleccionar rol</option>
            <option value="nuevo">➕ Nuevo</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.nombre}</option>
            ))}
          </select>

          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="">Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn btn-success w-50 me-2">Crear</button>
          <button type="button" className="btn btn-secondary w-50" onClick={onClose}>Cancelar</button>
        </div>

        {showPersonaModal && (
          <FormularioPersona
            onClose={() => setShowPersonaModal(false)}
            onCreacion={(nuevaPersona) => {
              fetchPersonas();
              setFormData((prev) => ({ ...prev, persona: nuevaPersona.id }));
            }}
          />
        )}

        {showRolModal && (
          <FormularioRol
            onClose={() => setShowRolModal(false)}
            onCreacion={(nuevoRol) => {
              fetchRoles();
              setFormData((prev) => ({ ...prev, rol: nuevoRol.id }));
            }}
          />
        )}
      </form>
    </div>
  );
}

export default FormularioUsuario;