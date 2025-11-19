import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioInquilino() {
  const [formData, setFormData] = useState({
    persona: '',
    alta: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/inquilino', formData);
      setMensaje('✅ Inquilino registrado correctamente');
      setError('');
      console.log('Inquilino creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar inquilino');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="inquilinos-form" onSubmit={handleSubmit}>
      <input name="persona" placeholder="ID de persona" onChange={handleChange} />
      <input name="alta" type="date" onChange={handleChange} />
      <button type="submit">Registrar Inquilino</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioInquilino;