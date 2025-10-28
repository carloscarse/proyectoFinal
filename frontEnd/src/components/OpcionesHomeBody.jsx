import React from 'react';
import axios from 'axios';
import { ENDPOINTS, urlMostrarUsuario } from '../endpoints/endpoints';

const OpcionesHomeBody = ({ onSeleccionarVista, onUsuarioCargado }) => {
  const handleMostrarTodos = () => {
    onSeleccionarVista('todos');
  };

  const handleMostrarUsuario = () => {
    const id = prompt('Ingrese el ID del usuario a mostrar:');
    if (!id) return;

    axios.get(`${ENDPOINTS}${urlMostrarUsuario(id)}`)
      .then(res => {
        onUsuarioCargado(res.data);
        onSeleccionarVista('uno');
      })
      .catch(err => {
        console.error('Error al obtener el usuario:', err);
        alert('No se pudo obtener el usuario. Verifique el ID.');
      });
  };

  const handleCrearUsuario = () => {
    onSeleccionarVista('crear');
  };

  const handleEditarUsuario = () => {
    const id = prompt('Ingrese el ID del usuario a editar:');
    if (!id) return;

    axios.get(`${ENDPOINTS}${urlMostrarUsuario(id)}`)
      .then(res => {
        onUsuarioCargado(res.data);
        onSeleccionarVista('editar');
      })
      .catch(err => {
        console.error('Error al obtener el usuario:', err);
        alert('No se pudo obtener el usuario. Verifique el ID.');
      });
  };

  const handleEliminarUsuario = () => {
    const id = prompt('Ingrese el ID del usuario a eliminar:');
    if (!id) return;

    axios.get(`${ENDPOINTS}${urlMostrarUsuario(id)}`)
      .then(res => {
        onUsuarioCargado(res.data);
        onSeleccionarVista('eliminar');
      })
      .catch(err => {
        console.error('Error al obtener el usuario:', err);
        alert('No se pudo obtener el usuario. Verifique el ID.');
      });
  };

  return (
    <>
      <button onClick={handleMostrarTodos}>Mostrar todos los usuarios</button>
      <button onClick={handleMostrarUsuario}>Mostrar usuario</button>
      <button onClick={handleCrearUsuario}>Crear usuario</button>
      <button onClick={handleEditarUsuario}>Editar usuario</button>
      <button onClick={handleEliminarUsuario}>Eliminar usuario</button>
    </>
  );
};

export default OpcionesHomeBody;