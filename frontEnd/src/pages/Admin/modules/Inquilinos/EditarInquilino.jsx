import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import '../Usuarios/FormularioUsuario.css';

function EditarInquilino({ inquilino, onClose }) {
  const formatDate = (fecha) => {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toISOString().split('T')[0]; // ✅ formato YYYY-MM-DD
  };

  const [formData, setFormData] = useState({
    persona: inquilino.persona,
    alta: formatDate(inquilino.alta)
  });

  const [personas, setPersonas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const res = await api.get('/persona');
        const personasConLabel = res.data.map(p => {
          const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
          const label = partes.filter(v => v && v !== 'null').join(' ');
          return { ...p, label };
        });
        setPersonas(personasConLabel);
      } catch (err) {
        console.error('❌ Error al obtener personas:', err.message);
      }
    };
    fetchPersonas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/inquilino/${inquilino.id}`, formData);
      setMensaje('✅ Inquilino actualizado correctamente');
      setError('');
      window.dispatchEvent(new CustomEvent('inquilinos:refresh'));
      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1500);
    } catch (err) {
      setError('❌ Error al actualizar inquilino');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <div className="usuarios-form-wrapper">
      <form className="usuarios-form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Editar Inquilino</h3>

        <div className="form-scroll">
          <label>Datos Personales</label>
          <select
            name="persona"
            value={String(formData.persona)}
            onChange={handleChange}
          >
            <option value="">Seleccionar persona</option>
            {personas.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.label}
              </option>
            ))}
          </select>

          <label>Fecha de Alta</label>
          <input
            name="alta"
            type="date"
            value={formData.alta}
            onChange={handleChange}
          />
        </div>

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn btn-success w-50 me-2">
            Guardar
          </button>
          <button type="button" className="btn btn-secondary w-50" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarInquilino;