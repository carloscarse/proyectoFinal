import React, { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import { createPortal } from 'react-dom';
import FormularioContrato from './FormularioContrato';

function ListaContrato() {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContrato, setSelectedContrato] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchContratos = async () => {
    try {
      const res = await api.get('/contrato/contratos');
      setContratos(res.data || []);
    } catch (err) {
      console.error('❌ Error al obtener contratos:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContratos();
    const handler = () => fetchContratos();
    window.addEventListener('contrato:refresh', handler);
    return () => window.removeEventListener('contrato:refresh', handler);
  }, []);

  const handleVer = (contrato) => {
    setSelectedContrato(contrato);
    setShowView(true);
  };

  const handleEditar = (contrato) => {
    setSelectedContrato(contrato);
    setShowEdit(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este contrato?')) {
      try {
        await api.delete(`/contrato/contrato/${id}`);
        alert('✅ Contrato eliminado');
        fetchContratos();
      } catch (err) {
        console.error('❌ Error al eliminar contrato:', err.message);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Gestión de Contratos</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>➕ Nuevo Contrato</button>
      </div>

      <table className="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Registro</th>
            <th>Fecha</th>
            <th>Condiciones</th>
            <th>Inquilino</th>
            <th>Espacio</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Nota</th>
            <th style={{ width: '120px', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="10">Cargando...</td></tr>
          ) : contratos.length === 0 ? (
            <tr><td colSpan="10">No hay contratos registrados</td></tr>
          ) : (
            contratos.map((contrato) => (
              <tr key={contrato.id}>
                <td>{contrato.id}</td>
                <td>{contrato.registro}</td>
                <td>{contrato.fecha}</td>
                <td>{contrato.condiciones || '—'}</td>
                <td>{contrato.inquilino}</td>
                <td>{contrato.espacio}</td>
                <td>{contrato.inicio}</td>
                <td>{contrato.fin}</td>
                <td>{contrato.nota || '—'}</td>
                <td className="text-center">
                  <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleVer(contrato)}>👁</button>
                  <button className="btn btn-outline-warning btn-sm me-1" onClick={() => handleEditar(contrato)}>✏️</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleEliminar(contrato.id)}>🗑</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Ver */}
      {showView && selectedContrato && createPortal(
        <div className="modal-overlay">
          <div className="modal-window p-3">
            <h5>Ver Contrato</h5>
            <p><b>ID:</b> {selectedContrato.id}</p>
            <p><b>Registro:</b> {selectedContrato.registro}</p>
            <p><b>Fecha:</b> {selectedContrato.fecha}</p>
            <p><b>Condiciones:</b> {selectedContrato.condiciones}</p>
            <p><b>Inquilino:</b> {selectedContrato.inquilino}</p>
            <p><b>Espacio:</b> {selectedContrato.espacio}</p>
            <p><b>Inicio:</b> {selectedContrato.inicio}</p>
            <p><b>Fin:</b> {selectedContrato.fin}</p>
            <p><b>Nota:</b> {selectedContrato.nota || '—'}</p>
            <button className="btn btn-secondary btn-sm mt-2" onClick={() => setShowView(false)}>Cerrar</button>
          </div>
        </div>,
        document.getElementById('modals-root')
      )}

      {/* Modal Editar */}
      {showEdit && selectedContrato && createPortal(
        <div className="modal-overlay">
          <FormularioContrato
            mode="edit"
            initialContrato={selectedContrato}
            onClose={() => setShowEdit(false)}
            onSaved={() => {
              setShowEdit(false);
              fetchContratos();
              window.dispatchEvent(new Event('contrato:refresh'));
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}

      {/* Modal Nuevo */}
      {showForm && createPortal(
        <div className="modal-overlay">
          <FormularioContrato
            mode="create"
            onClose={() => setShowForm(false)}
            onSaved={() => {
              setShowForm(false);
              fetchContratos();
              window.dispatchEvent(new Event('contrato:refresh'));
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}
    </div>
  );
}

export default ListaContrato;