import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function EditarDocumentacion({ documentacion, onClose }) {
  const [formData, setFormData] = useState({ ...documentacion });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/documentacion/${documentacion.id}`, formData);
      setMensaje('✅ Documentación actualizada');
      setError('');
      onClose();
    } catch (err) {
      setError('❌ Error al actualizar');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <div className="documentacion-edicion">
      <h3>Editar documentación</h3>
      <form onSubmit={handleSubmit}>
        <label>Documento</label>
        <input name="documento" value={formData.documento} onChange={handleChange} />
        <label>Inquilino</label>
        <input name="inquilino" value={formData.inquilino} onChange={handleChange} />
        <label>Descripción</label>
        <input name="descripcion" value={formData.descripcion} onChange={handleChange} />
        <label>Emisión</label>
        <input name="emision" type="date" value={formData.emision} onChange={handleChange} />
        <label>Vencimiento</label>
        <input name="vencimiento" type="date" value={formData.vencimiento} onChange={handleChange} />
        <label>Fecha de presentación</label>
        <input name="fechaPresentacion" type="date" value={formData.fechaPresentacion} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={onClose}>Cancelar</button>
        {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default EditarDocumentacion;