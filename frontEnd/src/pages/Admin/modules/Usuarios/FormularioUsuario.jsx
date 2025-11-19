import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioUsuario() {
  const [formData, setFormData] = useState({
    usuario: '',
    clave: '',
    persona: '',
    rol: '',
    estado: '',
    creacion: '',
    ultimoAcceso: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/usuario', formData);
      setMensaje('✅ Usuario registrado correctamente');
      setError('');
      console.log('Usuario creado:', res.data);
    } catch (err) {
      setError('❌ Error al registrar usuario');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="usuarios-form" onSubmit={handleSubmit}>
      <label>Nombre de usuario</label>
      <input name="usuario" placeholder="Nombre de usuario" onChange={handleChange} />

      <label>Clave</label>
      <input name="clave" type="password" placeholder="Clave" onChange={handleChange} />

      <label>ID de persona</label>
      <input name="persona" placeholder="ID de persona" onChange={handleChange} />

      <label>ID de rol</label>
      <input name="rol" placeholder="ID de rol" onChange={handleChange} />

      <label>Estado</label>
      <select name="estado" onChange={handleChange}>
        <option value="">Estado</option>
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>

      <label>Fecha de creación</label>
      <input name="creacion" type="date" onChange={handleChange} />

      <label>Último acceso</label>
      <input name="ultimoAcceso" type="date" onChange={handleChange} />

      <button type="submit">Registrar Usuario</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioUsuario;
