import FormularioReserva from './FormularioReserva';
import './EditarReserva.css';

function EditarReserva({ reserva, onClose }) {
  return (
    <div className="modal-overlay">
      <FormularioReserva
        mode="edit"
        reserva={reserva}
        onClose={onClose}
        onSaved={() => {
          onClose();
          // 🔑 refrescar lista
          window.dispatchEvent(new CustomEvent('reservas:refresh'));
        }}
      />
    </div>
  );
}

export default EditarReserva;