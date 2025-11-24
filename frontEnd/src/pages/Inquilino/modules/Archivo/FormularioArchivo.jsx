import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioArchivo() {
  const [formData, setFormData] = useState({
    documentacion: '',
    archivo: '',
    url: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/archivo', formData);
      setMensaje('✅ Archivo vinculado correctamente');
      setError('');
      console.log('Archivo creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar archivo');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="archivo-form" onSubmit={handleSubmit}>
      <label>ID de documentación</label>
      <input name="documentacion" placeholder="ID del documento" onChange={handleChange} />

      <label>Nombre del archivo</label>
      <input name="archivo" placeholder="Nombre del archivo" onChange={handleChange} />

      <label>URL del archivo</label>
      <input name="url" placeholder="URL o ruta del archivo" onChange={handleChange} />

      <button type="submit">Registrar Archivo</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioArchivo;