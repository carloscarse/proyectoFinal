import { useState, useEffect } from 'react';
import { api } from '../../../../endpoints/endpoints';
import './FormularioUsuario.css';

function EditarUsuario({ usuario, onClose, personas = [], roles = [] }) {
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
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setFormData({
        usuario: usuario.usuario ?? '',
        clave: usuario.clave ?? '',
        persona: String(usuario.persona ?? ''),
        rol: String(usuario.rol ?? ''),
        estado: usuario.estado ?? '',
        creacion: usuario.creacion ?? '',
        ultimoAcceso: usuario.ultimoAcceso ?? ''
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      await api.put(`/usuario/${usuario.id}`, {
        usuario: formData.usuario,
        clave: formData.clave,
        persona: formData.persona,
        rol: formData.rol,
        estado: formData.estado
      });

      setMensaje('✅ Cambios guardados correctamente');
      setError('');
      window.dispatchEvent(new CustomEvent('usuarios:refresh'));

      setTimeout(() => {
        setMensaje('');
        setGuardando(false);
        if (typeof onClose === 'function') {
          onClose(); // 👈 cierre garantizado desde el hijo
        }
      }, 1500);
    } catch (err) {
      console.error('❌ Error al actualizar usuario:', err.message);
      setError('❌ No se pudo guardar los cambios');
      setMensaje('');
      setGuardando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper full-width">
        <form className="usuarios-form vertical-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Editar Usuario</h3>

          <div className="form-scroll">
            <div className="form-group">
              <label>Usuario</label>
              <input name="usuario" value={formData.usuario} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Clave</label>
              <input name="clave" value={formData.clave} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Persona</label>
              <select name="persona" value={formData.persona} onChange={handleChange}>
                <option value="">Seleccionar persona</option>
                {personas.map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Rol</label>
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="">Seleccionar rol</option>
                {roles.map((r) => (
                  <option key={r.id} value={String(r.id)}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select name="estado" value={formData.estado} onChange={handleChange}>
                <option value="">Estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Creación</label>
              <input name="creacion" value={formData.creacion} readOnly disabled />
            </div>

            <div className="form-group">
              <label>Último Acceso</label>
              <input name="ultimoAcceso" value={formData.ultimoAcceso} readOnly disabled />
            </div>

            {mensaje && <p className="text-success mt-2">{mensaje}</p>}
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              className="btn btn-sm btn-warning me-2"
              style={{ backgroundColor: '#f0ad4e', borderColor: '#eea236', color: '#fff' }}
              disabled={guardando}
            >
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-warning"
              style={{ borderColor: '#f0ad4e', color: '#f0ad4e' }}
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;