import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarUsuario from './EditarUsuario';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await api.get('/usuarios');
        const data = Array.isArray(res.data) ? res.data : [];
        setUsuarios(data);
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
      }
    };
    cargarUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await api.delete(`/usuario/${id}`);
      setUsuarios(usuarios.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
  };

  const handleCerrarEdicion = () => {
    setUsuarioEditando(null);
  };

  return (
    <div>
      <h2>Usuarios registrados</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.usuario} - Rol: {u.rol} - Estado: {u.estado}
            <button onClick={() => handleEditar(u)}>✏️</button>
            <button onClick={() => handleEliminar(u.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      {usuarioEditando && (
        <EditarUsuario usuario={usuarioEditando} onClose={handleCerrarEdicion} />
      )}
    </div>
  );
}

export default ListaUsuarios;