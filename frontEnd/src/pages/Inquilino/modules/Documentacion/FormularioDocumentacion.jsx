import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioDocumentacion() {
  const [formData, setFormData] = useState({
    documento: '',
    inquilino: '',
    descripcion: '',
    emision: '',
    vencimiento: '',
    fechaPresentacion: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/documentacion', formData);
      setMensaje('✅ Documentación registrada correctamente');
      setError('');
      console.log('Documento creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar documentación');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="documentacion-form" onSubmit={handleSubmit}>
      <label>Documento</label>
      <input name="documento" placeholder="Nombre del documento" onChange={handleChange} />

      <label>ID de inquilino</label>
      <input name="inquilino" placeholder="ID de inquilino" onChange={handleChange} />

      <label>Descripción</label>
      <input name="descripcion" placeholder="Descripción del documento" onChange={handleChange} />

      <label>Fecha de emisión</label>
      <input name="emision" type="date" onChange={handleChange} />

      <label>Fecha de vencimiento</label>
      <input name="vencimiento" type="date" onChange={handleChange} />

      <label>Fecha de presentación</label>
      <input name="fechaPresentacion" type="date" onChange={handleChange} />

      <button type="submit">Registrar Documento</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioDocumentacion;