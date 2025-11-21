import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import './FormularioUsuario.css';

function FormularioPersona({ onClose }) {
  console.log('🟡 Modal FormularioPersona abierto');

  const [formData, setFormData] = useState({
    nombre: '',
    segundoNombre: '',
    apellido: '',
    segundoApellido: '',
    documento: '',
    nacimiento: '',
    sexo: '',
    email: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    console.log(`🟡 Cambió ${e.target.name}:`, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🟡 Enviando datos al backend:', formData);

    try {
      const res = await api.post('/persona', formData);
      console.log('🟢 Backend respondió:', res.data);

      setMensaje('✅ Persona registrada correctamente');
      setError('');

      setTimeout(() => {
        console.log('🟢 Cerrando modal FormularioPersona');
        setMensaje('');
        onClose();
      }, 1500);
    } catch (err) {
      console.error('🔴 Error al registrar persona:', err.message);
      setError('❌ Error al registrar persona');
      setMensaje('');
    }
  };

  return (
    <div className="modal-overlay">
      <form className="usuarios-form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Nueva Persona</h3>

        <div className="form-scroll">
          <label>Nombre</label>
          <input name="nombre" onChange={handleChange} />

          <label>Segundo Nombre</label>
          <input name="segundoNombre" onChange={handleChange} />

          <label>Apellido</label>
          <input name="apellido" onChange={handleChange} />

          <label>Segundo Apellido</label>
          <input name="segundoApellido" onChange={handleChange} />

          <label>Documento</label>
          <input name="documento" onChange={handleChange} />

          <label>Fecha de Nacimiento</label>
          <input name="nacimiento" type="date" onChange={handleChange} />

          <label>Sexo</label>
          <select name="sexo" onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
            <option value="X">Otro</option>
          </select>

          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} />
        </div>

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn btn-success w-50 me-2">Crear</button>
          <button type="button" className="btn btn-secondary w-50" onClick={() => {
            console.log('🟡 Cancelar y cerrar modal FormularioPersona');
            onClose();
          }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPersona;