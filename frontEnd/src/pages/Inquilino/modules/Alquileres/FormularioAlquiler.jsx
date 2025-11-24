import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioAlquiler() {
  const [formData, setFormData] = useState({
    contrato: '',
    espacio: '',
    inicio: '',
    fin: '',
    estado: '',
    nota: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/alquiler', formData);
      setMensaje('✅ Alquiler registrado correctamente');
      setError('');
      console.log('Alquiler creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar alquiler');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="alquileres-form" onSubmit={handleSubmit}>
      <input name="contrato" placeholder="ID de contrato" onChange={handleChange} />
      <input name="espacio" placeholder="ID de espacio" onChange={handleChange} />
      <input name="inicio" type="datetime-local" onChange={handleChange} />
      <input name="fin" type="datetime-local" onChange={handleChange} />
      <select name="estado" onChange={handleChange}>
        <option value="">Estado</option>
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
      <textarea name="nota" placeholder="Nota adicional" onChange={handleChange} />
      <button type="submit">Registrar Alquiler</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioAlquiler;