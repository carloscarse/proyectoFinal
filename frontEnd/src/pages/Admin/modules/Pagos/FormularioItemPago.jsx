import { useState } from 'react';
import './FormularioItemPago.css';

function FormularioItemPago({ pagoId, onClose, onSaved }) {
  const [item, setItem] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [nota, setNota] = useState('');

  const monto = cantidad * precio;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item || !cantidad || !precio || !pagoId) {
      alert('Faltan datos obligatorios');
      return;
    }

    const nuevoItem = {
      item,
      cantidad,
      precio,
      monto,
      nota,
      pago: pagoId,
    };

    onSaved(nuevoItem);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h5 className="text-center mb-3">➕ Nuevo Ítem de Pago</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Ítem:</label>
            <input
              type="text"
              className="form-control"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Cantidad:</label>
            <input
              type="number"
              className="form-control"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-2">
            <label>Precio:</label>
            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-2">
            <label>Nota (opcional):</label>
            <textarea
              className="form-control"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3">
            <strong className="me-2">Monto:</strong>
            <span>${monto}</span>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-success btn-sm me-2">
              Guardar
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioItemPago;