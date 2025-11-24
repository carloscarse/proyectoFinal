import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import './FormularioUsuario.css';

function FormularioRol({ onClose, onCreacion }) {
  console.log('🟡 Modal FormularioRol abierto');

  const [formData, setFormData] = useState({
    rol: '',
    descripcion: '',
    nota: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    console.log('🟢 FormularioRol montado');
    return () => console.log('🔴 FormularioRol desmontado');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`🟡 Cambió ${name}:`, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);

    console.log('🟡 Enviando datos al backend!');
    console.log('📦 Datos enviados:', formData);

    try {
      const res = await api.post('/rol', formData);
      console.log('🟢 Backend respondió OK:', res.data);

      if (onCreacion) {
        console.log('🟢 Ejecutando onCreacion con:', res.data);
        onCreacion(res.data);
      }

      setMensaje('✅ Rol registrado correctamente');
      setError('');

      setTimeout(() => {
        console.log('🟢 Ejecutando onClose desde FormularioRol');
        onClose();
      }, 100);
    } catch (err) {
      console.error('🔴 Error al registrar rol:', err.message);
      setError('❌ Error al registrar rol');
      setMensaje('');
      setEnviando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="usuarios-form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Nuevo Rol</h3>

        <div className="form-scroll">
          <label>Nombre técnico del rol</label>
          <input name="rol" onChange={handleChange} placeholder="Ej: admin, cliente, empleado..." />

          <label>Descripción</label>
          <input name="descripcion" onChange={handleChange} placeholder="Ej: Administrador del sistema" />

          <label>Nota (opcional)</label>
          <input name="nota" onChange={handleChange} placeholder="Observaciones o detalles" />
        </div>

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn btn-success w-50 me-2" disabled={enviando}>
            Crear
          </button>
          <button
            type="button"
            className="btn btn-secondary w-50"
            onClick={() => {
              console.log('🟡 Cancelar presionado, ejecutando onClose');
              onClose();
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioRol;