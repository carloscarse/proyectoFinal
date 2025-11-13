import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onClose }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/login', {
        usuario: user,
        contrasenia: pass
      });

      const data = res.data;

      if (data.ok && data.rol === 'admin') {
        navigate('/admin');
        onClose();
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-dark">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Login Administrador</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="form-group d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-outline-light w-50 me-2">Ingresar</button>
          <button type="button" className="btn btn-secondary w-50" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;