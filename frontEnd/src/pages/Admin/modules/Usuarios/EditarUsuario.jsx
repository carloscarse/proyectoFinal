import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function EditarUsuario({ usuario, onClose }) {
  const [formData, setFormData] = useState({ ...usuario });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuario/${usuario.id}`, formData);
      setMensaje('✅ Usuario actualizado');
      setError('');
      onClose();
    } catch (err) {
      setError('❌ Error al actualizar');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <div className="usuarios-edicion">
      <h3>Editar usuario</h3>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label>
        <input name="usuario" value={formData.usuario} onChange={handleChange} />
        <label>Clave</label>
        <input name="clave" value={formData.clave} onChange={handleChange} />
        <label>Persona</label>
        <input name="persona" value={formData.persona} onChange={handleChange} />
        <label>Rol</label>
        <input name="rol" value={formData.rol} onChange={handleChange} />
        <label>Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <label>Creación</label>
        <input name="creacion" type="date" value={formData.creacion} onChange={handleChange} />
        <label>Último acceso</label>
        <input name="ultimoAcceso" type="date" value={formData.ultimoAcceso} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={onClose}>Cancelar</button>
        {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default EditarUsuario;