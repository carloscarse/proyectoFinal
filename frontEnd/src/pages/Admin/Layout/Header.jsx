import { useUserStore } from '../../../Store/userStore';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useUserStore(); // ✅ usamos user en vez de label
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="admin-header d-flex justify-content-between align-items-center p-2 bg-dark text-light">
      <span>{user?.label || 'Usuario: Rol Nombre'}</span> {/* ✅ ahora sí muestra el label */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#3b5998', // azul marino claro
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          fontWeight: 'bold',
          textTransform: 'capitalize', // solo primera letra en mayúscula
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span className="me-2">Cerrar sesión</span>
        <span role="img" aria-label="candado" style={{ fontSize: '1.2rem' }}>🔒</span>
      </button>
    </header>
  );
}

export default Header;