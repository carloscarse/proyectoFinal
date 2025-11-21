import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function EditarFactura({ factura, onClose }) {
  const [formData, setFormData] = useState({ ...factura });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/factura/${factura.id}`, formData);
      setMensaje('✅ Factura actualizada');
      setError('');
      onClose();
    } catch (err) {
      setError('❌ Error al actualizar');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <div className="factura-edicion">
      <h3>Editar factura</h3>
      <form onSubmit={handleSubmit}>
        <label>Registro</label>
        <input name="registro" type="datetime-local" value={formData.registro} onChange={handleChange} />
        <label>Fecha</label>
        <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
        <label>Número</label>
        <input name="numero" value={formData.numero} onChange={handleChange} />
        <label>Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="emitida">Emitida</option>
          <option value="pagada">Pagada</option>
        </select>
        <label>Inquilino</label>
        <input name="inquilino" value={formData.inquilino} onChange={handleChange} />
        <label>Nota</label>
        <textarea name="nota" value={formData.nota} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={onClose}>Cancelar</button>
        {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default EditarFactura;