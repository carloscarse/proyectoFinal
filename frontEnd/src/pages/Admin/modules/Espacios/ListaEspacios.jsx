import React, { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import { createPortal } from 'react-dom';
import FormularioEspacio from './FormularioEspacio';

function ListaEspacios() {
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEspacio, setSelectedEspacio] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchEspacios = async () => {
    try {
      const res = await api.get('/espacio/espacios');
      setEspacios(res.data || []);
    } catch (err) {
      console.error('❌ Error al obtener espacios:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspacios();
    const handler = () => fetchEspacios();
    window.addEventListener('espacio:refresh', handler);
    return () => window.removeEventListener('espacio:refresh', handler);
  }, []);

  const handleVer = (espacio) => {
    setSelectedEspacio(espacio);
    setShowView(true);
  };

  const handleEditar = (espacio) => {
    setSelectedEspacio(espacio);
    setShowEdit(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este espacio?')) {
      try {
        await api.delete(`/espacio/espacio/${id}`);
        alert('✅ Espacio eliminado');
        fetchEspacios();
      } catch (err) {
        console.error('❌ Error al eliminar espacio:', err.message);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Gestión de Espacios</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>➕ Nuevo Espacio</button>
      </div>

      <table className="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Dimensiones</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Rubro</th>
            <th>Inquilino</th>
            <th>Recargo</th>
            <th>Descripción</th>
            <th style={{ width: '120px', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="11">Cargando...</td></tr>
          ) : espacios.length === 0 ? (
            <tr><td colSpan="11">No hay espacios registrados</td></tr>
          ) : (
            espacios.map((espacio) => (
              <tr key={espacio.id}>
                <td>{espacio.id}</td>
                <td>{espacio.nombre}</td>
                <td>{espacio.estado}</td>
                <td>{espacio.ancho}x{espacio.largo}</td>
                <td>{espacio.tipo}</td>
                <td>{espacio.precio}</td>
                <td>{espacio.rubro}</td>
                <td>{espacio.inquilino || '—'}</td>
                <td>{espacio.recargoUbicaion}</td>
                <td>{espacio.descripcion}</td>
                <td className="text-center">
                  <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleVer(espacio)}>👁</button>
                  <button className="btn btn-outline-warning btn-sm me-1" onClick={() => handleEditar(espacio)}>✏️</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleEliminar(espacio.id)}>🗑</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Ver */}
      {showView && selectedEspacio && createPortal(
        <div className="modal-overlay">
          <div className="modal-window p-3">
            <h5>Ver Espacio</h5>
            <p><b>ID:</b> {selectedEspacio.id}</p>
            <p><b>Nombre:</b> {selectedEspacio.nombre}</p>
            <p><b>Estado:</b> {selectedEspacio.estado}</p>
            <p><b>Dimensiones:</b> {selectedEspacio.ancho}x{selectedEspacio.largo}</p>
            <p><b>Tipo:</b> {selectedEspacio.tipo}</p>
            <p><b>Precio:</b> {selectedEspacio.precio}</p>
            <p><b>Rubro:</b> {selectedEspacio.rubro}</p>
            <p><b>Inquilino:</b> {selectedEspacio.inquilino || '—'}</p>
            <p><b>Recargo:</b> {selectedEspacio.recargoUbicaion}</p>
            <p><b>Descripción:</b> {selectedEspacio.descripcion}</p>
            <button className="btn btn-secondary btn-sm mt-2" onClick={() => setShowView(false)}>Cerrar</button>
          </div>
        </div>,
        document.getElementById('modals-root')
      )}

      {/* Modal Editar */}
      {showEdit && selectedEspacio && createPortal(
        <div className="modal-overlay">
          <FormularioEspacio
            mode="edit"
            initialEspacio={selectedEspacio}
            onClose={() => setShowEdit(false)}
            onSaved={() => {
              setShowEdit(false);
              fetchEspacios();
              window.dispatchEvent(new Event('espacio:refresh'));
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}

      {/* Modal Nuevo */}
      {showForm && createPortal(
        <div className="modal-overlay">
          <FormularioEspacio
            mode="create"
            onClose={() => setShowForm(false)}
            onSaved={() => {
              setShowForm(false);
              fetchEspacios();
              window.dispatchEvent(new Event('espacio:refresh'));
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}
    </div>
  );
}

export default ListaEspacios;