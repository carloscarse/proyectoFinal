import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarInquilino from './EditarInquilino'; // ✅ nuevo componente
import '../Usuarios/ListaUsuarios.css'; // reutilizamos estilos

function ListaInquilinos() {
  const [inquilinos, setInquilinos] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState(null);
  const [modoVer, setModoVer] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handler = () => setRefreshKey((k) => k + 1);
    window.addEventListener('inquilinos:refresh', handler);
    return () => window.removeEventListener('inquilinos:refresh', handler);
  }, []);

  const fetchInquilinos = async () => {
    try {
      const res = await api.get(`/inquilino/inquilinos?ts=${Date.now()}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setInquilinos(data);
    } catch (err) {
      console.error('❌ Error al obtener inquilinos:', err);
      setInquilinos([]);
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

  useEffect(() => {
    fetchInquilinos();
    fetchPersonas();
  }, [refreshKey]);

  const getPersonaLabel = (id) => {
    const persona = personas.find((p) => String(p.id) === String(id));
    return persona ? persona.label : '—';
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '—';
    const d = new Date(fecha);
    return d.toLocaleDateString('es-AR');
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este inquilino?')) return;
    setInquilinos((prev) => prev.filter((i) => i.id !== id));
    try {
      await api.delete(`/inquilino/${id}`);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error('❌ Error al eliminar inquilino:', err);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <div className="usuarios-lista">
      <h3 className="text-center mb-3">Gestión de Inquilinos</h3>

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Persona</th>
            <th>Fecha de Alta</th>
            <th className="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inquilinos.map((i) => (
            <tr key={i.id}>
              <td>{getPersonaLabel(i.persona)}</td>
              <td>{formatearFecha(i.alta)}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => {
                    setInquilinoSeleccionado(i);
                    setModoVer(true);
                  }}
                >
                  👁 Ver
                </button>
                <button
                  className="btn btn-outline-warning btn-sm me-2"
                  onClick={() => {
                    setInquilinoSeleccionado(i);
                    setModoEdicion(true);
                  }}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleEliminar(i.id)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
          {inquilinos.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                No hay inquilinos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Ver Inquilino */}
      {modoVer && inquilinoSeleccionado && (
        <div className="modal-overlay">
          <div className="usuarios-form">
            <h4 className="text-center mb-3">Datos del Inquilino</h4>
            <div className="form-scroll">
              <p><strong>ID:</strong> {inquilinoSeleccionado.id}</p>
              <p><strong>Persona:</strong> {getPersonaLabel(inquilinoSeleccionado.persona)}</p>
              <p><strong>Fecha de Alta:</strong> {formatearFecha(inquilinoSeleccionado.alta)}</p>
            </div>
            <div className="form-buttons">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setModoVer(false);
                  setInquilinoSeleccionado(null);
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Inquilino */}
      {modoEdicion && inquilinoSeleccionado && (
        <div className="modal-overlay">
          <EditarInquilino
            inquilino={inquilinoSeleccionado}
            onClose={() => {
              setModoEdicion(false);
              setInquilinoSeleccionado(null);
              setRefreshKey((k) => k + 1);
              window.dispatchEvent(new CustomEvent('inquilinos:refresh'));
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ListaInquilinos;