import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarUsuario from './EditarUsuario';
import './ListaUsuarios.css';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modoVer, setModoVer] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarClave, setMostrarClave] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handler = () => setRefreshKey((k) => k + 1);
    window.addEventListener('usuarios:refresh', handler);
    return () => window.removeEventListener('usuarios:refresh', handler);
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get(`/usuarios?ts=${Date.now()}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setUsuarios(data);
    } catch (err) {
      console.error('❌ Error al obtener usuarios:', err);
      setUsuarios([]);
    }
  };

  const fetchPersonas = async () => {
    try {
      const res = await api.get(`/persona?ts=${Date.now()}`);
      const personasConLabel = (Array.isArray(res.data) ? res.data : []).map((p) => {
        const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
        const label = partes.filter((v) => v && v !== 'null').join(' ');
        return { ...p, label };
      });
      setPersonas(personasConLabel);
    } catch (err) {
      console.error('❌ Error al obtener personas:', err);
      setPersonas([]);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await api.get(`/rol?ts=${Date.now()}`);
      const rolesConLabel = (Array.isArray(res.data) ? res.data : []).map((r) => ({
        ...r,
        label: r.rol,
      }));
      setRoles(rolesConLabel);
    } catch (err) {
      console.error('❌ Error al obtener roles:', err);
      setRoles([]);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchPersonas();
    fetchRoles();
  }, [refreshKey]);

  const getPersonaLabel = (id) => {
    const persona = personas.find((p) => String(p.id) === String(id));
    return persona ? persona.label : '—';
  };

  const getRolLabel = (id) => {
    const rol = roles.find((r) => String(r.id) === String(id));
    return rol ? rol.label : '—';
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    try {
      await api.delete(`/usuario/${id}`);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error('❌ Error al eliminar usuario:', err);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <div className="usuarios-lista">
      <h3 className="text-center mb-3">Gestión de Usuarios</h3>

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Persona</th>
            <th>Rol</th>
            <th>Estado</th>
            <th className="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{getPersonaLabel(u.persona)}</td>
              <td>{getRolLabel(u.rol)}</td>
              <td>{u.estado}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => {
                    setUsuarioSeleccionado(u);
                    setModoVer(true);
                  }}
                >
                  👁 Ver
                </button>
                <button
                  className="btn btn-outline-warning btn-sm me-2"
                  onClick={() => {
                    setUsuarioSeleccionado(u);
                    setModoEdicion(true);
                  }}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleEliminar(u.id)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Ver Usuario */}
      {modoVer && usuarioSeleccionado && (
        <div className="modal-overlay">
          <div className="usuarios-form">
            <h4 className="text-center mb-3">Datos del Usuario</h4>
            <div className="form-scroll">
              <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
              <p><strong>Usuario:</strong> {usuarioSeleccionado.usuario}</p>

              <label>Clave</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarClave ? 'text' : 'password'}
                  value={usuarioSeleccionado.clave}
                  readOnly
                  style={{ width: '100%', paddingRight: '2rem' }}
                />
                <span
                  onClick={() => setMostrarClave((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  {mostrarClave ? '🙈' : '👁️'}
                </span>
              </div>

              <p><strong>Persona:</strong> {getPersonaLabel(usuarioSeleccionado.persona)}</p>
              <p><strong>Rol:</strong> {getRolLabel(usuarioSeleccionado.rol)}</p>
              <p><strong>Estado:</strong> {usuarioSeleccionado.estado}</p>
              <p><strong>Creación:</strong> {usuarioSeleccionado.creacion}</p>
              <p><strong>Último Acceso:</strong> {usuarioSeleccionado.ultimoAcceso}</p>
            </div>
            <div className="form-buttons">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setModoVer(false);
                  setUsuarioSeleccionado(null);
                  setMostrarClave(false);
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Usuario */}
      {modoEdicion && usuarioSeleccionado && (
        <div className="modal-overlay">
          <EditarUsuario
            usuario={usuarioSeleccionado}
            onClose={() => {
              setModoEdicion(false);
              setUsuarioSeleccionado(null);
              setRefreshKey((k) => k + 1);
              window.dispatchEvent(new CustomEvent('usuarios:refresh'));
            }}
            personas={personas}
            roles={roles}
          />
        </div>
      )}
    </div>
  );
}

export default ListaUsuarios;