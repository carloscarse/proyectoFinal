import { useState, useEffect } from 'react';
import FormularioDocumentacion from './FormularioDocumentacion';
import ListaDocumentacion from './ListaDocumentacion';
import './Documentacion.css'; // estilos si querés

function Documentacion() {
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const handleRefresh = () => {
      setMostrarModal(false);
    };
    window.addEventListener('documentacion:refresh', handleRefresh);
    return () => window.removeEventListener('documentacion:refresh', handleRefresh);
  }, []);

  return (
    <div className="documentacion-wrapper">
      <h2 className="text-center mb-4">Gestión de Documentación</h2>

      <div className="text-end mb-3">
        <button className="btn btn-warning" onClick={() => setMostrarModal(true)}>
          Nueva Documentación
        </button>
      </div>

      {mostrarModal && (
        <FormularioDocumentacion onClose={() => setMostrarModal(false)} />
      )}

      <h4 className="mt-4 mb-2">Documentación Registrada</h4>
      <ListaDocumentacion />
    </div>
  );
}

export default Documentacion;