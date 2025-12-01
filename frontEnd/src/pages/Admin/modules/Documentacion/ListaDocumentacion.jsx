import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import FormularioDocumentacion from './FormularioDocumentacion';
import { createPortal } from 'react-dom';

function ListaDocumentacion() {
  const [documentaciones, setDocumentaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modales y selección
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const formatoFecha = (fechaIso) => {
    if (!fechaIso || isNaN(Date.parse(fechaIso))) return '';
    const fecha = new Date(fechaIso);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const fetchDocumentaciones = async () => {
    try {
      setLoading(true);
      const res = await api.get('/documentaciones');
      const lista = res.data || [];

      const docsConLabel = await Promise.all(
        lista.map(async (doc) => {
          let inquilinoLabel = `Inquilino #${doc.inquilino}`;
          try {
            if (doc.inquilino) {
              const resInq = await api.get(`/inquilino/${doc.inquilino}`);
              const inq = resInq.data || {};
              if (inq.persona) {
                const resPersona = await api.get(`/persona/${inq.persona}`);
                const p = resPersona.data || {};
                const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
                inquilinoLabel = partes.filter(v => v && v !== 'null').join(' ').trim() || inquilinoLabel;
              }
            }
          } catch (err) {
            console.error(`❌ Error al obtener inquilino/persona ${doc.inquilino}:`, err.message);
          }

          return {
            ...doc,
            inquilinoLabel,
            emisionFmt: formatoFecha(doc.emision),
            vencimientoFmt: formatoFecha(doc.vencimiento),
            presentacionFmt: formatoFecha(doc.fechaPresentacion)
          };
        })
      );

      setDocumentaciones(docsConLabel);
    } catch (err) {
      console.error('❌ Error al obtener documentaciones:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentaciones();
    const handler = () => fetchDocumentaciones();
    window.addEventListener('documentacion:refresh', handler);
    return () => window.removeEventListener('documentacion:refresh', handler);
  }, []);

  // Acciones
  const handleVer = (doc) => {
    setSelectedDoc(doc);
    setShowView(true);
  };

  const handleEditar = (doc) => {
    setSelectedDoc(doc);
    setShowEdit(true);
  };

  const handleEliminar = async (id) => {
    const confirmado = window.confirm('¿Seguro que deseas eliminar este registro?');
    if (!confirmado) return;

    try {
      await api.delete(`/documentacion/${id}`);
      // Feedback y refresco
      alert('✅ Documento eliminado');
      // Refrescar lista y notificar
      fetchDocumentaciones();
      window.dispatchEvent(new Event('documentacion:refresh'));
    } catch (err) {
      console.error('❌ Error al eliminar documento:', err.message);
      alert('❌ No se pudo eliminar el documento');
    }
  };

  return (
    <div className="lista-documentacion">
      <table className="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Inquilino</th>
            <th>Descripción</th>
            <th>Emisión</th>
            <th>Vencimiento</th>
            <th>Presentación</th>
            <th style={{ width: '120px' }}>Archivo</th>
            <th style={{ width: '120px', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="8">Cargando...</td></tr>
          ) : documentaciones.length === 0 ? (
            <tr><td colSpan="8">No hay documentación registrada</td></tr>
          ) : (
            documentaciones.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.inquilinoLabel}</td>
                <td>{doc.descripcion}</td>
                <td>{doc.emisionFmt}</td>
                <td>{doc.vencimientoFmt}</td>
                <td>{doc.presentacionFmt}</td>
                <td className="text-truncate" style={{ maxWidth: '120px' }}>{doc.documento}</td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-primary btn-sm me-1"
                    title="Ver"
                    onClick={() => handleVer(doc)}
                  >
                    👁
                  </button>
                  <button
                    className="btn btn-outline-warning btn-sm me-1"
                    title="Editar"
                    onClick={() => handleEditar(doc)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    title="Eliminar"
                    onClick={() => handleEliminar(doc.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Ver */}
      {showView && selectedDoc && createPortal(
        <div className="modal-overlay">
          <div className="modal-window p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="m-0">Ver documentación</h5>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowView(false)}>Cerrar</button>
            </div>
            <div className="small">
              <p><b>ID:</b> {selectedDoc.id}</p>
              <p><b>Inquilino:</b> {selectedDoc.inquilinoLabel}</p>
              <p><b>Descripción:</b> {selectedDoc.descripcion}</p>
              <p><b>Emisión:</b> {selectedDoc.emisionFmt}</p>
              <p><b>Vencimiento:</b> {selectedDoc.vencimientoFmt}</p>
              <p><b>Presentación:</b> {selectedDoc.presentacionFmt}</p>
              <p className="text-truncate"><b>Archivo:</b> {selectedDoc.documento}</p>
            </div>
          </div>
        </div>,
        document.getElementById('modals-root')
      )}

      {/* Modal Editar usando FormularioDocumentacion */}
      {showEdit && selectedDoc && createPortal(
        <div className="modal-overlay">
          <FormularioDocumentacion
            mode="edit"
            initialDoc={selectedDoc}
            onClose={() => setShowEdit(false)}
            onSaved={() => {
              setShowEdit(false);
              fetchDocumentaciones();
              window.dispatchEvent(new Event('documentacion:refresh'));
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}
    </div>
  );
}

export default ListaDocumentacion;