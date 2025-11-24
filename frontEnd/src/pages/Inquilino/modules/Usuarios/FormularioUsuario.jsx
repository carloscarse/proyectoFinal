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
      console.log('🟡 Llamando a /persona desde frontend...');
      const res = await api.get('/persona');
      console.log('🟢 Respuesta recibida:', res.data);

      const personasConLabel = res.data.map(p => {
        const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
        const label = partes.filter(v => v && v !== 'null').join(' ');
        return { ...p, label };
      });

      console.log('🧩 Lista de personas con label limpio:', personasConLabel);
      setPersonas(personasConLabel);
    } catch (err) {
      console.error('🔴 Error al obtener personas:', err.message);
    }
  };

  const fetchRoles = async () => {
    try {
      console.log('🟡 Llamando a /rol desde frontend...');
      const res = await api.get('/rol');
      const rolesConLabel = res.data.map(r => ({
        ...r,
        label: r.rol // 👈 usamos el campo técnico como label
      }));
      setRoles(rolesConLabel);
      console.log('✅ Roles cargados:', rolesConLabel);
    } catch (err) {
      console.error('❌ Error al obtener roles:', err.message);
    }
  };

  useEffect(() => {
    console.log('🟡 Montando FormularioUsuario...');
    fetchPersonas();
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valor = String(value);

    if (name === 'persona' && valor === 'nuevo') {
      console.log('🟡 Abriendo modal de persona desde select');
      setShowPersonaModal(true);
      return;
    }

    if (name === 'rol' && valor === 'nuevo') {
      console.log('🟡 Abriendo modal de rol desde select');
      setShowRolModal(true);
      return;
    }

    setFormData({ ...formData, [name]: valor });
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

      // 👇 Dispara el evento global para refrescar ListaUsuarios
      window.dispatchEvent(new CustomEvent('usuarios:refresh'));

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
      <div className="usuarios-form-wrapper">
        <form className="usuarios-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Nuevo Usuario</h3>

          <div className="form-scroll">
            <label>Usuario</label>
            <input
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Usuario"
            />

            <label>Clave</label>
            <input
              name="clave"
              type="password"
              value={formData.clave}
              onChange={handleChange}
              placeholder="Clave"
            />

            <label>Datos Personales</label>
            <select
              name="persona"
              value={String(formData.persona)}
              onChange={handleChange}
            >
              <option value="">Seleccionar persona</option>
              <option value="nuevo">➕ Nuevo</option>
              {personas.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.label}
                </option>
              ))}
            </select>

            <label>Rol</label>
            <select
              name="rol"
              value={String(formData.rol)}
              onChange={handleChange}
            >
              <option value="">Seleccionar rol</option>
              <option value="nuevo">➕ Nuevo</option>
              {roles.map((r) => (
                <option key={r.id} value={String(r.id)}>
                  {r.label}
                </option>
              ))}
            </select>

            <label>Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="">Estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          {mensaje && <p className="text-success mt-2">{mensaje}</p>}
          {error && <p className="text-danger mt-2">{error}</p>}

          <div className="form-buttons">
            <button type="submit" className="btn btn-success w-50 me-2">
              Crear
            </button>
            <button type="button" className="btn btn-secondary w-50" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {showPersonaModal && (
        <FormularioPersona
          onClose={() => setShowPersonaModal(false)}
          onCreacion={(nuevaPersona) => {
            if (nuevaPersona && nuevaPersona.id) {
              const partes = [
                nuevaPersona.nombre,
                nuevaPersona.segundoNombre,
                nuevaPersona.apellido,
                nuevaPersona.segundoApellido
              ];
              const label = partes.filter(v => v && v !== 'null').join(' ');
              const nuevaOpcion = { ...nuevaPersona, label };

              setPersonas((prev) => [...prev, nuevaOpcion]);
              setFormData((prev) => ({ ...prev, persona: String(nuevaPersona.id) }));
            }
            setShowPersonaModal(false);
          }}
        />
      )}

      {showRolModal && (
        <FormularioRol
          onClose={() => setShowRolModal(false)}
          onCreacion={(nuevoRol) => {
            if (!nuevoRol || !nuevoRol.id) {
              console.warn('⚠️ Rol inválido, no se actualiza el formulario');
              return;
            }

            const label = nuevoRol.label || nuevoRol.rol;
            const nuevo = { ...nuevoRol, label };

            setRoles((prev) => [...prev, nuevo]);
            setFormData((prev) => ({ ...prev, rol: String(nuevo.id) }));
            setShowRolModal(false);
          }}
        />
      )}
    </div>
  );
}

export default FormularioUsuario;