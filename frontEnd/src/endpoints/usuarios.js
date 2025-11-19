import { api } from './index';
import {
  urlMostrarUsuarios,
  urlCrearUsuario,
  urlMostrarUsuario,
  urlActualizarUsuario,
  urlEliminarUsuario
} from './index';

export const obtenerUsuarios = () => api.get(urlMostrarUsuarios);

export const crearUsuario = (data) => api.post(urlCrearUsuario, data);

export const obtenerUsuarioPorId = (id) => api.get(urlMostrarUsuario(id));

export const actualizarUsuario = (id, data) => api.put(urlActualizarUsuario(id), data);

export const eliminarUsuario = (id) => api.delete(urlEliminarUsuario(id));