import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, urlActualizarUsuario } from '../endpoints/endpoints';

const EditarUsuarioHomeBody = ({ usuario }) => {
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [mensaje, setMensaje] = useState(null);

  if (!usuario) return <p>No se recibió ningún usuario para editar.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${ENDPOINTS}${urlActualizarUsuario(usuario.id)}`, { nombre, email })
      .then(res => {
        setMensaje('Usuario editado correctamente');
      })
      .catch(err => {
        console.error('Error al editar usuario:', err);
        setMensaje('No se pudo editar el usuario');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </>
  );
};

export default EditarUsuarioHomeBody;