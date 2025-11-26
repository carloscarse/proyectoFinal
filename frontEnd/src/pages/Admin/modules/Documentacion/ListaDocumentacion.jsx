import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import FormularioDocumentacion from './FormularioDocumentacion';
import { createPortal } from 'react-dom';

function ListaDocumentacion() {
  const [documentaciones, setDocumentaciones] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    }
  };

  useEffect(() => {
    fetchDocumentaciones();
    const handler = () => fetchDocumentaciones();
    window.addEventListener('documentacion:refresh', handler);
    return () => window.removeEventListener('documentacion:refresh', handler);
  }, []);

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
          {documentaciones.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.inquilinoLabel}</td>
              <td>{doc.descripcion}</td>
              <td>{doc.emisionFmt}</td>
              <td>{doc.vencimientoFmt}</td>
              <td>{doc.presentacionFmt}</td>
              <td className="text-truncate" style={{ maxWidth: '120px' }}>{doc.documento}</td>
              <td className="text-center">
                <button className="btn btn-outline-primary btn-sm me-1" title="Ver">👁</button>
                <button className="btn btn-outline-warning btn-sm me-1" title="Editar">✏️</button>
                <button className="btn btn-outline-danger btn-sm" title="Eliminar">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && createPortal(
        <div className="modal-overlay">
          <FormularioDocumentacion onClose={() => setShowForm(false)} />
        </div>,
        document.getElementById('modals-root')
      )}
    </div>
  );
}

export default ListaDocumentacion;