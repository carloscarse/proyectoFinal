import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import FormularioPersona from '../Usuarios/FormularioPersona'; // ✅ ruta corregida
import '../Usuarios/FormularioUsuario.css'; // ✅ reutilizamos estilos de usuarios

function FormularioInquilino({ onClose }) {
  const initialForm = {
    persona: '',
    alta: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [personas, setPersonas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showPersonaModal, setShowPersonaModal] = useState(false);

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

  useEffect(() => {
    fetchPersonas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valor = String(value);

    if (name === 'persona' && valor === 'nuevo') {
      setShowPersonaModal(true);
      return;
    }

    setFormData({ ...formData, [name]: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/inquilino', formData);
      setMensaje('✅ Inquilino registrado correctamente');
      setError('');

      // refresca la lista de inquilinos
      window.dispatchEvent(new CustomEvent('inquilinos:refresh'));

      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1500);
    } catch (err) {
      setError('❌ Error al registrar inquilino');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <form className="usuarios-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Registrar Inquilino</h3>

          <div className="form-scroll">
            <label>Datos Personales</label>
            <select
              name="persona"
              value={String(formData.persona)}
              onChange={handleChange}
            >
              <option value="">Seleccionar persona</option>
              <option value="nuevo">➕ Nuevo</option>
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
              Registrar
            </button>
            <button type="button" className="btn btn-secondary w-50" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {showPersonaModal && (
        <FormularioPersona
          onClose={() => setShowPersonaModal(false)}
          onCreacion={(nuevaPersona) => {
            if (nuevaPersona && nuevaPersona.id) {
              const partes = [
                nuevaPersona.nombre,
                nuevaPersona.segundoNombre,
                nuevaPersona.apellido,
                nuevaPersona.segundoApellido
              ];
              const label = partes.filter(v => v && v !== 'null').join(' ');
              const nuevaOpcion = { ...nuevaPersona, label };

              setPersonas((prev) => [...prev, nuevaOpcion]);
              setFormData((prev) => ({ ...prev, persona: String(nuevaPersona.id) }));
            }
            setShowPersonaModal(false);
          }}
        />
      )}
    </div>
  );
}

export default FormularioInquilino;