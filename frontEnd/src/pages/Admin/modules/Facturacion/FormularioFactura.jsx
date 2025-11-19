import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioFactura() {
  const [formData, setFormData] = useState({
    registro: '',
    fecha: '',
    numero: '',
    estado: '',
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
      const res = await api.post('/factura', formData);
      setMensaje('✅ Factura registrada correctamente');
      setError('');
      console.log('Factura creada:', res.data);
    } catch (err) {
      setError('❌ Error al registrar factura');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="facturacion-form" onSubmit={handleSubmit}>
      <input name="registro" type="datetime-local" onChange={handleChange} />
      <input name="fecha" type="date" onChange={handleChange} />
      <input name="numero" placeholder="Número de factura" onChange={handleChange} />
      <select name="estado" onChange={handleChange}>
        <option value="">Estado</option>
        <option value="emitida">Emitida</option>
        <option value="pagada">Pagada</option>
      </select>
      <input name="inquilino" placeholder="ID del inquilino" onChange={handleChange} />
      <textarea name="nota" placeholder="Nota adicional" onChange={handleChange} />
      <button type="submit">Registrar Factura</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioFactura;