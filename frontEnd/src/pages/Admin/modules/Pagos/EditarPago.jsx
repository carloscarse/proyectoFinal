import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import FormularioPago from './FormularioPago';
import FormularioItemPago from './FormularioItemPago'; // 👈 modal secundario
import './EditarPago.css';

function EditarPago({ pago, onClose, onSaved }) {
  const [itemsPago, setItemsPago] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);

  // 🔄 Cargar ítems del pago
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get(`/itempago/pago/${pago.id}`);
        setItemsPago(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('❌ Error al obtener ítems de pago:', err?.message || err);
        setItemsPago([]);
      }
    };
    if (pago?.id) fetchItems();
  }, [pago]);

  // 🗑 Eliminar ítem
  const handleEliminarItem = async (id) => {
    if (!window.confirm('¿Eliminar este ítem de pago?')) return;
    try {
      await api.delete(`/itempago/${id}`);
      setItemsPago((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar ítem de pago:', err?.message || err);
      alert('Error al eliminar el ítem de pago');
    }
  };

  // ➕ Guardar nuevo ítem
  const handleGuardarItem = async (nuevoItem) => {
    try {
      const res = await api.post('/itempago', { ...nuevoItem, pago: pago.id });
      setItemsPago((prev) => [...prev, { id: res.data.id, ...nuevoItem }]);
      setShowItemModal(false);
    } catch (err) {
      console.error('❌ Error al guardar ítem de pago:', err?.message || err);
      alert('Error al guardar el ítem de pago');
    }
  };

  // 🔢 Calcular total
  const total = itemsPago.reduce((sum, item) => sum + Number(item.monto || 0), 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FormularioPago
          mode="edit"
          initialPago={pago}
          onClose={onClose}
          onSaved={onSaved}
        />

        {/* Botón Agregar Ítem */}
        <div className="d-flex justify-content-start mt-3 mb-2">
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => setShowItemModal(true)}
          >
            ➕ Agregar Ítem de Pago
          </button>
        </div>

        {/* Lista de ítems */}
        {itemsPago.length > 0 ? (
          <ul className="list-group">
            {itemsPago.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {item.cantidad} × {item.item} | Precio: ${item.precio} | Monto: ${item.monto}
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleEliminarItem(item.id)}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Este pago no tiene ítems registrados.</p>
        )}

        {/* Labels de total */}
        <div className="d-flex justify-content-end mt-2">
          <strong className="me-2">Total:</strong>
          <span>${total}</span>
        </div>

        {/* Modal secundario para crear ítem */}
        {showItemModal && (
          <FormularioItemPago
            pagoId={pago.id}
            onClose={() => setShowItemModal(false)}
            onSaved={handleGuardarItem}
          />
        )}
      </div>
    </div>
  );
}

export default EditarPago;