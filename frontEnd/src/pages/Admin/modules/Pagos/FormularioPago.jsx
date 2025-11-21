import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioPago() {
  const [formData, setFormData] = useState({
    registro: '',
    fecha: '',
    usuario: '',
    factura: '',
    item: '',
    inquilino: '',
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
      const res = await api.post('/pago', formData);
      setMensaje('✅ Pago registrado correctamente');
      setError('');
      console.log('Pago creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar pago');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="pagos-form" onSubmit={handleSubmit}>
      <input name="registro" type="datetime-local" onChange={handleChange} />
      <input name="fecha" type="date" onChange={handleChange} />
      <input name="usuario" placeholder="ID del usuario" onChange={handleChange} />
      <input name="factura" placeholder="ID de factura" onChange={handleChange} />
      <input name="item" placeholder="Item pagado" onChange={handleChange} />
      <input name="inquilino" placeholder="ID del inquilino" onChange={handleChange} />
      <textarea name="nota" placeholder="Nota adicional" onChange={handleChange} />
      <button type="submit">Registrar Pago</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioPago;