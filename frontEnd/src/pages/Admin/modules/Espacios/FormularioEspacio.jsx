import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioEspacio() {
  const [formData, setFormData] = useState({
    nombre: '',
    estado: '',
    ancho: '',
    largo: '',
    tipo: '',
    precio: '',
    rubro: '',
    recargoUbicaion: '',
    descripcion: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/espacio', formData);
      setMensaje('✅ Espacio registrado correctamente');
      setError('');
      console.log('Espacio creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar espacio');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="espacios-form" onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre del espacio" onChange={handleChange} />
      <select name="estado" onChange={handleChange}>
        <option value="">Estado</option>
        <option value="libre">Libre</option>
        <option value="ocupado">Ocupado</option>
        <option value="revervado">Reservado</option>
        <option value="mantenimiento">Mantenimiento</option>
      </select>
      <input name="ancho" placeholder="Ancho (m)" onChange={handleChange} />
      <input name="largo" placeholder="Largo (m)" onChange={handleChange} />
      <input name="tipo" placeholder="Tipo de espacio" onChange={handleChange} />
      <input name="precio" placeholder="Precio base" onChange={handleChange} />
      <input name="rubro" placeholder="ID de rubro" onChange={handleChange} />
      <input name="recargoUbicaion" placeholder="Recargo ubicación (%)" onChange={handleChange} />
      <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <button type="submit">Registrar Espacio</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioEspacio;