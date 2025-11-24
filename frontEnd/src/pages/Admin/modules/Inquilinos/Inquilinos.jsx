import { useState } from 'react';
import FormularioInquilino from './FormularioInquilino';
import ListaInquilinos from './ListaInquilinos';
import '../Usuarios/ListaUsuarios.css'; // reutilizamos estilos del módulo usuarios

function Inquilinos() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="usuarios-lista">
      <h3 className="text-center mb-3">Gestión de Inquilinos</h3>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-warning" onClick={() => setShowModal(true)}>
          NUEVO INQUILINO
        </button>
      </div>

      <ListaInquilinos />

      {showModal && (
        <div className="modal-overlay">
          <div className="usuarios-form">
            <h4 className="text-center mb-3">Registrar Inquilino</h4>
            <FormularioInquilino onClose={() => setShowModal(false)} />
            <div className="form-buttons mt-3">
              <button
                className="btn btn-secondary w-100"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Inquilinos;