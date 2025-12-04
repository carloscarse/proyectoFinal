import { useState } from 'react';
import FormularioReserva from './FormularioReserva';
import ListaReservas from './ListaReservas';
import './reservas.css';

function Reservas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <section className="reservas-container">
      <h1>Gestión de Reservas</h1>

      {/* Botón para abrir el formulario */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => setMostrarFormulario(true)}
        >
          ➕ Nueva Reserva
        </button>
      </div>

      {/* Lista de reservas */}
      <ListaReservas />

      {/* Modal con el formulario */}
      {mostrarFormulario && (
        <div className="modal-overlay">
          <FormularioReserva
            mode="create"
            onClose={() => setMostrarFormulario(false)}
            onSaved={() => {
              setMostrarFormulario(false);
              // 🔑 Dispara el evento que escucha ListaReservas
              window.dispatchEvent(new CustomEvent('reservas:refresh'));
            }}
          />
        </div>
      )}
    </section>
  );
}

export default Reservas;