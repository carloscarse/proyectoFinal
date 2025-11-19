import { useUserStore } from '../../../Store/userStore';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { logout, user } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpia el store
    navigate('/'); // Redirige al home
  };

  return (
    <header className="admin-header">
      <span>Bienvenido, {user?.nombre || 'Admin'}</span>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </header>
  );
}

export default Header;