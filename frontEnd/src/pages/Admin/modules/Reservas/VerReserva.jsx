import './VerReserva.css';

function VerReserva({ reserva, onClose, formatoFechaHora }) {
  if (!reserva) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card wide">
        <div className="modal-header">
          <h4>Detalle de Reserva</h4>
          <button className="btn btn-sm btn-outline-light" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p><strong>Fecha:</strong> {formatoFechaHora(reserva.fecha)}</p>
          <p><strong>Espacio:</strong> {reserva.espacioNombre ?? reserva.espacio}</p>
          <p><strong>Inquilino:</strong> {reserva.inquilinoNombre ?? reserva.inquilino}</p>
          <p><strong>Tipo:</strong> {reserva.tipo}</p>
          <p><strong>Actividad:</strong> {reserva.actividad}</p>
          <p><strong>Inicio:</strong> {formatoFechaHora(reserva.diaInicio)}</p>
          <p><strong>Fin:</strong> {formatoFechaHora(reserva.diaFin)}</p>
          <p><strong>Adelanto:</strong> ${reserva.adelanto}</p>
          <p><strong>Estado:</strong> {reserva.estado}</p>
          <p><strong>Nota:</strong> {reserva.nota || '—'}</p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default VerReserva;