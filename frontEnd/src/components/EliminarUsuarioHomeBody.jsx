import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, urlEliminarUsuario } from '../endpoints/endpoints';

const EliminarUsuarioHomeBody = ({ usuario }) => {
  const [mensaje, setMensaje] = useState(null);
  const [confirmado, setConfirmado] = useState(false);

  if (!usuario) return <p>No se recibió ningún usuario para eliminar.</p>;

  const handleEliminar = () => {
    axios.delete(`${ENDPOINTS}${urlEliminarUsuario(usuario.id)}`)
      .then(res => {
        setMensaje('Usuario eliminado correctamente');
        setConfirmado(true);
      })
      .catch(err => {
        console.error('Error al eliminar usuario:', err);
        setMensaje('No se pudo eliminar el usuario');
      });
  };

  return (
    <>
      <h3>¿Desea eliminar el siguiente usuario?</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
          </tr>
        </tbody>
      </table>

      {!confirmado && (
        <button onClick={handleEliminar}>Confirmar eliminación</button>
      )}

      {mensaje && <p>{mensaje}</p>}
    </>
  );
};

export default EliminarUsuarioHomeBody;