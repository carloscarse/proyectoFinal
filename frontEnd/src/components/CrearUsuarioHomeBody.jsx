import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, urlCrearUsuario } from '../endpoints/endpoints';

const CrearUsuarioHomeBody = ({ onUsuarioCreado }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${ENDPOINTS}${urlCrearUsuario}`, { nombre, email })
      .then(res => {
        setMensaje(res.data.message || 'Usuario creado correctamente');
        setNombre('');
        setEmail('');
        if (onUsuarioCreado) onUsuarioCreado(); // volver a la lista si querés
      })
      .catch(err => {
        console.error('Error al crear usuario:', err);
        setMensaje('No se pudo crear el usuario');
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
        <button type="submit">Guardar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </>
  );
};

export default CrearUsuarioHomeBody;