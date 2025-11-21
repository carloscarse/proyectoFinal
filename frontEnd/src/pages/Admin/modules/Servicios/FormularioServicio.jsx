import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioServicio() {
  const [formData, setFormData] = useState({
    servicio: '',
    cantidad: '',
    precio: '',
    factura: '',
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
      const res = await api.post('/servicio', formData);
      setMensaje('✅ Servicio registrado correctamente');
      setError('');
      console.log('Servicio creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar servicio');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="servicios-form" onSubmit={handleSubmit}>
      <input name="servicio" placeholder="Nombre del servicio" onChange={handleChange} />
      <input name="cantidad" type="number" placeholder="Cantidad" onChange={handleChange} />
      <input name="precio" type="number" placeholder="Precio unitario" onChange={handleChange} />
      <input name="factura" placeholder="ID de factura" onChange={handleChange} />
      <textarea name="nota" placeholder="Nota adicional" onChange={handleChange} />
      <button type="submit">Registrar Servicio</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioServicio;