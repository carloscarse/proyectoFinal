import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function EditarReserva({ reserva, onClose }) {
  const [formData, setFormData] = useState({ ...reserva });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/reserva/${reserva.id}`, formData);
      setMensaje('✅ Reserva actualizada');
      setError('');
      onClose();
    } catch (err) {
      setError('❌ Error al actualizar');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <div className="reservas-edicion">
      <h3>Editar reserva</h3>
      <form onSubmit={handleSubmit}>
        <label>Fecha</label>
        <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
        <label>Espacio</label>
        <input name="espacio" value={formData.espacio} onChange={handleChange} />
        <label>Inquilino</label>
        <input name="inquilino" value={formData.inquilino} onChange={handleChange} />
        <label>Tipo</label>
        <input name="tipo" value={formData.tipo} onChange={handleChange} />
        <label>Día inicio</label>
        <input name="diaInicio" type="date" value={formData.diaInicio} onChange={handleChange} />
        <label>Día fin</label>
        <input name="diaFin" type="date" value={formData.diaFin} onChange={handleChange} />
        <label>Hora inicio</label>
        <input name="inicio" type="time" value={formData.inicio} onChange={handleChange} />
        <label>Hora fin</label>
        <input name="fin" type="time" value={formData.fin} onChange={handleChange} />
        <label>Actividad</label>
        <input name="actividad" value={formData.actividad} onChange={handleChange} />
        <label>Adelanto</label>
        <input name="adelanto" value={formData.adelanto} onChange={handleChange} />
        <label>Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="pagado">Pagado</option>
          <option value="adeudado">Adeudado</option>
        </select>
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

export default EditarReserva;