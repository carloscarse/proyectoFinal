import { useState } from 'react';
import FormularioPago from './FormularioPago';
import ListaPagos from './ListaPagos';
import './pagos.css';

function Pagos() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="pagos-container">
      <h1 className="text-center mb-3">Gestión de Pagos</h1>

      {/* Botón NUEVO PAGO */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-warning" onClick={() => setShowModal(true)}>
          NUEVO PAGO
        </button>
      </div>

      {/* Lista de pagos */}
      <ListaPagos />

      {/* Modal Registrar Pago */}
      {showModal && (
        <div className="modal-overlay">
          <div className="usuarios-form">
            <h4 className="text-center mb-3">Registrar Pago</h4>
            <FormularioPago onClose={() => setShowModal(false)} />
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

export default Pagos;