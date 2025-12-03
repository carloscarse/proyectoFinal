import { useState } from 'react';

function FormularioItemPago({ onClose }) {
  const [formData, setFormData] = useState({
    item: '',
    descripcion: '',
    cantidad: 1,
    precio: 0,
    monto: 0,
    nota: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // 👇 recalcular monto automáticamente
      updated.monto = Number(updated.cantidad) * Number(updated.precio);
      return updated;
    });
  };

  const handleCrear = () => {
    if (onClose) onClose(formData, false); // guardar y cerrar
  };

  const handleCancelar = () => {
    if (onClose) onClose(null, false); // no guardar, cerrar
  };

  const handleOtroItem = () => {
    if (onClose) onClose(formData, true); // guardar y reabrir vacío
    setFormData({
      item: '',
      descripcion: '',
      cantidad: 1,
      precio: 0,
      monto: 0,
      nota: ''
    });
  };

  return (
    <div className="usuarios-form">
      <h4 className="mb-3">Ítem de Pago</h4>
      <form>
        <label>Item</label>
        <input
          name="item"
          value={formData.item}
          onChange={handleChange}
          maxLength={30}
        />

        <label>Descripción</label>
        <input
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          maxLength={200}
        />

        <label>Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
        />

        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />

        <label>Monto</label>
        <input
          type="number"
          step="0.01"
          name="monto"
          value={formData.monto}
          readOnly
        />

        <label>Nota</label>
        <textarea
          name="nota"
          value={formData.nota}
          onChange={handleChange}
          maxLength={200}
        />

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-success btn-sm" onClick={handleCrear}>
            Crear
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="button" className="btn btn-info btn-sm" onClick={handleOtroItem}>
            Otro Ítem
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioItemPago;