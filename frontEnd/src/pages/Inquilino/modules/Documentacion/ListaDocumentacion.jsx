import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarDocumentacion from './EditarDocumentacion';

function ListaDocumentacion() {
  const [documentos, setDocumentos] = useState([]);
  const [docEditando, setDocEditando] = useState(null);

  useEffect(() => {
    const cargarDocumentos = async () => {
      try {
        const res = await api.get('/documentacion');
        const data = Array.isArray(res.data) ? res.data : [];
        setDocumentos(data);
      } catch (err) {
        console.error('Error al obtener documentación:', err);
      }
    };
    cargarDocumentos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este documento?')) return;
    try {
      await api.delete(`/documentacion/${id}`);
      setDocumentos(documentos.filter((d) => d.id !== id));
    } catch (err) {
      console.error('Error al eliminar documentación:', err);
    }
  };

  const handleEditar = (doc) => {
    setDocEditando(doc);
  };

  const handleCerrarEdicion = () => {
    setDocEditando(null);
  };

  return (
    <div>
      <h2>Documentación registrada</h2>
      <ul>
        {documentos.map((d) => (
          <li key={d.id}>
            {d.documento} - Inquilino: {d.inquilino} - {d.fechaPresentacion}
            <button onClick={() => handleEditar(d)}>✏️</button>
            <button onClick={() => handleEliminar(d.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      {docEditando && (
        <EditarDocumentacion documentacion={docEditando} onClose={handleCerrarEdicion} />
      )}
    </div>
  );
}

export default ListaDocumentacion;