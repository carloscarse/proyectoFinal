import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import './VerPago.css';

function VerPago({ pago, onClose }) {
  const [itemsPago, setItemsPago] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // ✅ nueva consulta al backend
        const res = await api.get(`/itempago/pago/${pago.id}`);
        setItemsPago(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('❌ Error al obtener ítems de pago:', err?.message || err);
        setItemsPago([]);
      }
    };
    if (pago?.id) fetchItems();
  }, [pago]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="text-center mb-3">🧾 Detalle del Pago</h4>

        <div className="detalle-linea">
          <strong>Fecha:</strong> <span>{pago.fecha}</span>
        </div>
        <div className="detalle-linea">
          <strong>Usuario:</strong> <span>{pago.usuario?.usuario}</span>
        </div>
        <div className="detalle-linea">
          <strong>Inquilino:</strong>{' '}
          <span>{pago.inquilino?.label || pago.inquilinoLabel}</span>
        </div>

        <h5 className="mt-4">💳 Ítems de Pago</h5>
        {itemsPago.length > 0 ? (
          <ul className="list-group">
            {itemsPago.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.cantidad} - {item.item} | Precio: ${item.precio} | Monto: ${item.monto}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Este pago no tiene ítems registrados.</p>
        )}

        <div className="detalle-linea mt-3">
          <strong>Nota:</strong> <span>{pago.nota || '—'}</span>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerPago;