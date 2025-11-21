import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import './FormularioUsuario.css';

function FormularioRol({ onClose, onCreacion }) {
  const [formData, setFormData] = useState({
    rol: '',
    descripcion: '',
    nota: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rol || !formData.descripcion) {
      setError('Faltan datos requeridos: rol y descripción');
      return;
    }

    try {
      const res = await api.post('/rol', formData);
      setMensaje('✅ Rol registrado correctamente');
      setError('');
      console.log('Rol creado:', res.data);

      if (onCreacion) {
        onCreacion(formData); // ← devuelve el rol creado
      }

      setTimeout(() => {
        setMensaje('');
        onClose(); // ← solo cierra el modal de rol
      }, 1500);
    } catch (err) {
      setError('❌ Error al registrar rol');
      setMensaje('');
      console.error(err);
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
          <button type="submit" className="btn btn-success w-50 me-2">Crear</button>
          <button type="button" className="btn btn-secondary w-50" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioRol;